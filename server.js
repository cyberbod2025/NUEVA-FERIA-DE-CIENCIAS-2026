const http = require('node:http');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const STANDS_PATH = path.join(DATA_DIR, 'stands.json');
const STATE_PATH = path.join(DATA_DIR, 'state.json');
const PORT = Number(process.env.PORT || 3000);

const APP_VERSION = 2;
const PRESENCE_TIMEOUT_MS = 18 * 60 * 1000;
const SIMULATION_INTERVAL_MS = 9000;
const MAX_VISITORS = 500;
const MOVEMENT_LOG_LIMIT = 160;
const SASE_SHARED_SECRET = String(process.env.SASE_SHARED_SECRET || '');
const TEACHER_PROVIDERS = new Set(['teacher', 'docente', 'maestro']);

const FIRST_NAMES = [
  'Valentina', 'Mateo', 'Sofia', 'Bruno', 'Camila', 'Thiago', 'Martina', 'Dylan', 'Lucia', 'Tomas',
  'Emma', 'Joaquin', 'Mia', 'Lucas', 'Julieta', 'Benjamin', 'Renata', 'Felipe', 'Paula', 'Nicolas',
  'Aitana', 'Santino', 'Zoe', 'Lautaro', 'Abril', 'Iker', 'Olivia', 'Agustin', 'Elena', 'Ramiro'
];

const LAST_NAMES = [
  'Rios', 'Gomez', 'Diaz', 'Lopez', 'Suarez', 'Perez', 'Ruiz', 'Martinez', 'Torres', 'Silva',
  'Molina', 'Vega', 'Castro', 'Acosta', 'Mendez', 'Navarro', 'Ortiz', 'Ibarra', 'Benitez', 'Cabrera'
];

const GROUPS = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A'];

const CATEGORY_META = {
  robotica: { label: 'Robotica', icon: 'smart_toy', accent: '#5a3bdd', soft: 'rgba(90, 59, 221, 0.16)' },
  biologia: { label: 'Biologia', icon: 'biotech', accent: '#17a46f', soft: 'rgba(23, 164, 111, 0.15)' },
  quimica: { label: 'Quimica', icon: 'science', accent: '#f97316', soft: 'rgba(249, 115, 22, 0.15)' },
  energia: { label: 'Energia', icon: 'bolt', accent: '#eab308', soft: 'rgba(234, 179, 8, 0.17)' },
  tecnologia: { label: 'Tecnologia', icon: 'memory', accent: '#00b9d1', soft: 'rgba(0, 185, 209, 0.16)' },
  fisica: { label: 'Fisica', icon: 'flare', accent: '#7c3aed', soft: 'rgba(124, 58, 237, 0.16)' },
  matematica: { label: 'Matematica', icon: 'calculate', accent: '#2563eb', soft: 'rgba(37, 99, 235, 0.14)' },
  ambiente: { label: 'Ambiente', icon: 'eco', accent: '#16a34a', soft: 'rgba(22, 163, 74, 0.14)' },
  tierra: { label: 'Tierra', icon: 'public', accent: '#0f766e', soft: 'rgba(15, 118, 110, 0.16)' },
  arte: { label: 'Arte + Tech', icon: 'palette', accent: '#db2777', soft: 'rgba(219, 39, 119, 0.15)' }
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown; charset=utf-8'
};

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function bootstrap() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);

      if (url.pathname === '/api/state' && request.method === 'GET') {
        const state = await loadState({ writeIfAdvanced: true });
        return sendJson(response, 200, state);
      }

      if (url.pathname === '/api/state' && request.method === 'PUT') {
        const stands = await loadCatalog();
        const body = await readJsonBody(request);
        const nextState = normalizeIncomingState(body, stands);
        await writeState(nextState);
        return sendJson(response, 200, nextState);
      }

      if (url.pathname === '/api/session/student' && request.method === 'POST') {
        try {
          const body = await readJsonBody(request);
          const sessionData = await registerStudentSession(body);
          return sendJson(response, 200, sessionData);
        } catch (error) {
          return sendJson(response, error.statusCode || 400, { error: 'invalid_student', message: error.message });
        }
      }

      if (url.pathname === '/api/session/teacher/sase' && request.method === 'POST') {
        try {
          const body = await readJsonBody(request);
          const sessionData = await registerTeacherSessionFromSase(body);
          return sendJson(response, 200, sessionData);
        } catch (error) {
          return sendJson(response, error.statusCode || 401, { error: 'invalid_teacher_session', message: error.message });
        }
      }

      if (url.pathname === '/api/reset' && request.method === 'POST') {
        const state = await createInitialState();
        await writeState(state);
        return sendJson(response, 200, state);
      }

      await serveStatic(url.pathname, response);
    } catch (error) {
      console.error(error);
      sendJson(response, 500, { error: 'server_error', message: error.message });
    }
  });

  server.listen(PORT, () => {
    console.log(`Feria backend listo en http://localhost:${PORT}`);
  });
}

async function loadState(options = {}) {
  const stands = await loadCatalog();
  let state;

  try {
    const raw = await fs.readFile(STATE_PATH, 'utf8');
    state = normalizeIncomingState(JSON.parse(raw), stands);
  } catch (error) {
    state = await createInitialState(stands);
  }

  const advanced = advanceSimulationFromElapsedTime(state);
  if (advanced || options.writeIfAdvanced) {
    await writeState(state);
  }

  return state;
}

async function loadCatalog() {
  const raw = await fs.readFile(STANDS_PATH, 'utf8');
  const list = JSON.parse(raw);

  return list.map((stand) => {
    const meta = CATEGORY_META[stand.category] || CATEGORY_META.tecnologia;
    const targetCapacity = Number(stand.targetCapacity || 18);
    return {
      ...stand,
      label: meta.label,
      icon: meta.icon,
      accent: meta.accent,
      accentSoft: meta.soft,
      targetCapacity,
      warningCapacity: Number(stand.warningCapacity || targetCapacity + 4),
      maxCapacity: Number(stand.maxCapacity || targetCapacity + 8),
      initialOccupancy: Number(stand.initialOccupancy || targetCapacity),
      map: {
        x: Number(stand.map?.x || 0),
        y: Number(stand.map?.y || 0),
        w: Number(stand.map?.w || 10),
        h: Number(stand.map?.h || 8)
      }
    };
  });
}

async function createInitialState(preloadedStands) {
  const stands = preloadedStands || await loadCatalog();
  const now = Date.now();
  const standAssignments = expandAssignments(stands.map((stand) => stand.initialOccupancy));
  const visitors = [];

  for (let index = 0; index < MAX_VISITORS; index += 1) {
    const standId = standAssignments[index];
    visitors.push(createVisitor(index, standId, stands, now));
  }

  return normalizeIncomingState({
    version: APP_VERSION,
    createdAt: now,
    lastSimulationAt: now,
    simulationTick: 0,
    stands,
    visitors,
    announcements: createDefaultAnnouncements(now),
    movementLog: buildSeedMovementLog(visitors, stands, now)
  }, stands);
}

function normalizeIncomingState(input, stands) {
  const standsById = new Map(stands.map((stand) => [stand.id, stand]));
  const visitors = Array.isArray(input?.visitors) ? input.visitors : [];

  return {
    version: APP_VERSION,
    createdAt: Number(input?.createdAt || Date.now()),
    lastSimulationAt: Number(input?.lastSimulationAt || Date.now()),
    simulationTick: Number(input?.simulationTick || 0),
    stands,
    visitors: visitors.map((visitor, index) => normalizeVisitor(visitor, standsById, index)),
    announcements: Array.isArray(input?.announcements) ? input.announcements.slice(0, 6) : createDefaultAnnouncements(Date.now()),
    movementLog: Array.isArray(input?.movementLog) ? input.movementLog.slice(0, MOVEMENT_LOG_LIMIT) : buildSeedMovementLog(visitors, stands, Date.now())
  };
}

function normalizeVisitor(visitor, standsById, index) {
  const fallbackStandId = standsById.has(visitor.currentStandId) ? visitor.currentStandId : 1;
  return {
    id: String(visitor.id || `student-${index + 1}`),
    name: String(visitor.name || `Visitante ${index + 1}`),
    group: String(visitor.group || GROUPS[index % GROUPS.length]),
    firstName: String(visitor.firstName || ''),
    lastName: String(visitor.lastName || ''),
    isRegistered: Boolean(visitor.isRegistered),
    currentStandId: fallbackStandId,
    currentCheckInAt: Number(visitor.currentCheckInAt || Date.now()),
    visitedStandIds: Array.isArray(visitor.visitedStandIds) ? visitor.visitedStandIds.filter((standId) => standsById.has(standId)) : [fallbackStandId],
    quizAttempts: visitor.quizAttempts || {},
    preferences: Array.isArray(visitor.preferences) && visitor.preferences.length ? visitor.preferences : ['tecnologia', 'fisica'],
    avgVisitMinutes: Number(visitor.avgVisitMinutes || 9),
    bonusPoints: Number(visitor.bonusPoints || 0)
  };
}

function createDefaultAnnouncements(now) {
  return [
    { id: 'a1', type: 'info', text: 'El sistema usa QR por stand para estimar aforo y redistribuir visitantes.', createdAt: now - 4 * 60 * 1000 },
    { id: 'a2', type: 'flow', text: 'Se detecto sobrecarga inicial en Cohetes de Agua y Nanotecnologia. Las recomendaciones ya lo compensan.', createdAt: now - 2 * 60 * 1000 }
  ];
}

function expandAssignments(counts) {
  const assignments = [];
  counts.forEach((count, index) => {
    for (let item = 0; item < count; item += 1) {
      assignments.push(index + 1);
    }
  });
  return assignments;
}

function createVisitor(index, currentStandId, stands, now) {
  if (index === 0) {
    return {
      id: 'student-1',
      name: 'Visitante 001',
      firstName: '',
      lastName: '',
      group: 'Pendiente',
      isRegistered: false,
      currentStandId: 13,
      currentCheckInAt: now - 4 * 60 * 1000,
      visitedStandIds: [2, 5, 9, 12, 13],
      quizAttempts: {
        2: { selectedIndex: 0, correct: true, points: 120, answeredAt: now - 38 * 60 * 1000 },
        5: { selectedIndex: 1, correct: false, points: 40, answeredAt: now - 21 * 60 * 1000 }
      },
      preferences: ['fisica', 'tecnologia'],
      avgVisitMinutes: 11,
      bonusPoints: 90
    };
  }

  const name = `${FIRST_NAMES[index % FIRST_NAMES.length]} ${LAST_NAMES[(index * 7) % LAST_NAMES.length]}`;
  const group = GROUPS[index % GROUPS.length];
  const preferences = getPreferences(index, stands);
  const visitedCount = 3 + (index % 8);
  const visitedStandIds = buildVisitedStandIds(currentStandId, visitedCount, index);
  const quizAttempts = buildQuizAttempts(visitedStandIds, index, now);

  return {
    id: `student-${index + 1}`,
    name: `Visitante ${String(index + 1).padStart(3, '0')}`,
    firstName: '',
    lastName: '',
    group: 'Pendiente',
    isRegistered: false,
    currentStandId,
    currentCheckInAt: now - ((index % 12) * 60 * 1000),
    visitedStandIds,
    quizAttempts,
    preferences,
    avgVisitMinutes: 6 + (index % 8),
    bonusPoints: (index * 19) % 180
  };
}

function getPreferences(index, stands) {
  const first = stands[index % stands.length].category;
  const second = stands[(index * 3) % stands.length].category;
  return first === second ? [first, stands[(index * 5) % stands.length].category] : [first, second];
}

function buildVisitedStandIds(currentStandId, count, seed) {
  const set = new Set([currentStandId]);
  let offset = 1;

  while (set.size < count && offset <= 84) {
    const candidate = ((currentStandId + seed * 3 + offset * 5 - 1) % 28) + 1;
    set.add(candidate);
    offset += 1;
  }

  return Array.from(set).sort((left, right) => left - right);
}

function buildQuizAttempts(visitedStandIds, seed, now) {
  const attempts = {};
  const limit = Math.max(1, Math.floor(visitedStandIds.length / 2));

  visitedStandIds.slice(0, limit).forEach((standId, index) => {
    const correct = (seed + standId + index) % 3 !== 0;
    attempts[standId] = {
      selectedIndex: correct ? 0 : 1,
      correct,
      points: correct ? 120 : 40,
      answeredAt: now - ((seed + index) % 80) * 60 * 1000
    };
  });

  return attempts;
}

function buildSeedMovementLog(visitors, stands, now) {
  return visitors.slice(0, 120).map((visitor, index) => {
    const toStand = findStandById(stands, visitor.currentStandId);
    const fallbackFrom = visitor.visitedStandIds.length > 1 ? visitor.visitedStandIds[visitor.visitedStandIds.length - 2] : visitor.currentStandId;
    const fromStand = findStandById(stands, fallbackFrom);

    return {
      id: `seed-${visitor.id}`,
      visitorId: visitor.id,
      visitorName: visitor.name,
      group: visitor.group,
      fromStandId: fromStand.id,
      toStandId: toStand.id,
      at: now - ((index % 44) + 1) * 60 * 1000,
      type: fromStand.id === toStand.id ? 'refresh' : 'move',
      reason: index % 4 === 0 ? 'scan' : 'simulation'
    };
  }).sort((left, right) => right.at - left.at).slice(0, MOVEMENT_LOG_LIMIT);
}

function advanceSimulationFromElapsedTime(state) {
  const elapsed = Date.now() - state.lastSimulationAt;
  const ticks = Math.min(12, Math.floor(elapsed / SIMULATION_INTERVAL_MS));
  if (!ticks) {
    return false;
  }

  for (let step = 0; step < ticks; step += 1) {
    simulateFlow(state, 12);
  }

  state.lastSimulationAt = Date.now();
  return true;
}

function simulateFlow(state, movementCount) {
  const now = Date.now();

  for (let step = 0; step < movementCount; step += 1) {
    const seed = state.simulationTick + step + 1;
    const visitor = pickVisitorForSimulation(state, seed);
    if (!visitor) {
      continue;
    }

    const recommendation = getRecommendationForVisitor(visitor, computeStandStats(state));
    if (recommendation && recommendation.id !== visitor.currentStandId) {
      moveVisitorToStand(state, visitor, recommendation.id, { now, fromSimulation: true, reason: 'simulation' });
    } else {
      visitor.currentCheckInAt = now;
    }
  }

  state.simulationTick += 1;
  state.lastSimulationAt = now;
}

function pickVisitorForSimulation(state, seed) {
  if (!state.visitors.length) {
    return null;
  }
  return state.visitors[(seed * 17) % state.visitors.length];
}

function computeStandStats(state) {
  const occupancyByStand = {};
  state.stands.forEach((stand) => {
    occupancyByStand[stand.id] = 0;
  });

  state.visitors.forEach((visitor) => {
    if (Date.now() - visitor.currentCheckInAt <= PRESENCE_TIMEOUT_MS && occupancyByStand[visitor.currentStandId] !== undefined) {
      occupancyByStand[visitor.currentStandId] += 1;
    }
  });

  return state.stands.map((stand) => {
    const occupancy = occupancyByStand[stand.id] || 0;
    let status = 'balanced';
    if (occupancy >= stand.maxCapacity) status = 'hot';
    else if (occupancy >= stand.warningCapacity) status = 'warm';
    else if (occupancy <= stand.targetCapacity - 3) status = 'low';

    return {
      ...stand,
      occupancy,
      status,
      delta: occupancy - stand.targetCapacity
    };
  });
}

function getRecommendationForVisitor(visitor, standStats) {
  const visited = new Set(visitor.visitedStandIds);
  const currentStand = standStats.find((stand) => stand.id === visitor.currentStandId);
  const candidates = standStats.filter((stand) => stand.id !== visitor.currentStandId && stand.occupancy < stand.maxCapacity);

  let best = null;
  let bestScore = -Infinity;

  candidates.forEach((stand) => {
    let score = (stand.targetCapacity - stand.occupancy) * 5;
    if (stand.status === 'low') score += 20;
    if (stand.status === 'balanced') score += 12;
    if (stand.status === 'warm') score -= 8;
    if (!visited.has(stand.id)) score += 16;
    if (visitor.preferences.includes(stand.category)) score += 12;
    if (currentStand && currentStand.zone === stand.zone) score += 8;
    score += stand.id / 100;

    if (score > bestScore) {
      best = stand;
      bestScore = score;
    }
  });

  return best || standStats[0];
}

function moveVisitorToStand(state, visitor, standId, options) {
  const now = options.now || Date.now();
  const previousStandId = visitor.currentStandId;
  const alreadyVisited = visitor.visitedStandIds.includes(standId);
  visitor.currentStandId = standId;
  visitor.currentCheckInAt = now;

  if (!alreadyVisited) {
    visitor.visitedStandIds.push(standId);
    visitor.visitedStandIds.sort((left, right) => left - right);
    visitor.bonusPoints = (visitor.bonusPoints || 0) + (options.fromSimulation ? 8 : 18);
  }

  visitor.avgVisitMinutes = Math.max(5, Math.min(18, Math.round(((visitor.avgVisitMinutes || 9) * 3 + 8 + (standId % 6)) / 4)));
  recordMovement(state, visitor, previousStandId, standId, now, options.reason || 'simulation');

  if (options.fromSimulation && !visitor.quizAttempts[standId] && (state.simulationTick + standId + visitor.name.length) % 5 === 0) {
    const correct = (state.simulationTick + standId + visitor.group.length) % 4 !== 0;
    visitor.quizAttempts[standId] = {
      selectedIndex: correct ? 0 : 1,
      correct,
      points: correct ? 120 : 40,
      answeredAt: now
    };
  }
}

function recordMovement(state, visitor, fromStandId, toStandId, timestamp, reason) {
  if (!Array.isArray(state.movementLog)) {
    state.movementLog = [];
  }

  state.movementLog.unshift({
    id: `m-${timestamp}-${visitor.id}-${toStandId}`,
    visitorId: visitor.id,
    visitorName: visitor.name,
    group: visitor.group,
    fromStandId,
    toStandId,
    at: timestamp,
    type: fromStandId === toStandId ? 'refresh' : 'move',
    reason
  });

  state.movementLog = state.movementLog.slice(0, MOVEMENT_LOG_LIMIT);
}

async function registerStudentSession(input) {
  const state = await loadState({ writeIfAdvanced: true });
  const firstName = cleanText(input?.firstName);
  const lastName = cleanText(input?.lastName);
  const group = cleanText(input?.group);

  if (!firstName || !lastName || !group) {
    throw new Error('Nombre, apellido y grupo son obligatorios.');
  }

  const normalizedKey = buildStudentKey(firstName, lastName, group);
  let visitor = state.visitors.find((item) => buildStudentKey(item.firstName || '', item.lastName || '', item.group || '') === normalizedKey && item.isRegistered);

  if (!visitor) {
    visitor = state.visitors.find((item) => !item.isRegistered);
  }

  if (!visitor) {
    visitor = createVisitor(state.visitors.length, 1, state.stands, Date.now());
    state.visitors.push(visitor);
  }

  visitor.firstName = firstName;
  visitor.lastName = lastName;
  visitor.name = `${firstName} ${lastName}`;
  visitor.group = group;
  visitor.isRegistered = true;
  visitor.currentCheckInAt = Date.now();

  await writeState(state);

  return {
    role: 'student',
    userId: visitor.id,
    displayName: visitor.name,
    group: visitor.group
  };
}

async function registerTeacherSessionFromSase(input) {
  const token = cleanText(input?.token);

  if (!token) {
    throw createHttpError(400, 'Falta el token de SASE.');
  }

  if (!SASE_SHARED_SECRET) {
    throw createHttpError(503, 'El backend no tiene configurado SASE_SHARED_SECRET.');
  }

  const payload = verifySaseTeacherToken(token);

  return {
    role: 'teacher',
    provider: 'sase',
    userId: String(payload.sub || payload.teacherId || payload.email),
    displayName: String(payload.name || payload.displayName || 'Docente SASE'),
    email: String(payload.email || ''),
    issuedAt: Number(payload.iat || Math.floor(Date.now() / 1000)) * 1000,
    expiresAt: Number(payload.exp || Math.floor(Date.now() / 1000) + 3600) * 1000
  };
}

function verifySaseTeacherToken(token) {
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw createHttpError(400, 'El token de SASE no tiene el formato esperado.');
  }

  const payloadPart = parts[0];
  const signaturePart = parts[1];
  const expectedSignature = crypto.createHmac('sha256', SASE_SHARED_SECRET).update(payloadPart).digest('base64url');

  if (!timingSafeCompare(signaturePart, expectedSignature)) {
    throw createHttpError(401, 'La firma del token de SASE no es valida.');
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'));
  } catch (error) {
    throw createHttpError(400, 'No se pudo leer el contenido del token de SASE.');
  }

  const now = Math.floor(Date.now() / 1000);
  const role = cleanText(payload.role).toLowerCase();

  if (!TEACHER_PROVIDERS.has(role)) {
    throw createHttpError(403, 'El token recibido no corresponde a un maestro.');
  }

  if (!payload.sub && !payload.teacherId && !payload.email) {
    throw createHttpError(400, 'El token de SASE no trae un identificador de maestro.');
  }

  if (payload.iat && Number(payload.iat) > now + 60) {
    throw createHttpError(401, 'El token de SASE todavia no es valido.');
  }

  if (!payload.exp || Number(payload.exp) <= now) {
    throw createHttpError(401, 'El token de SASE esta vencido.');
  }

  return payload;
}

function timingSafeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function buildStudentKey(firstName, lastName, group) {
  return [firstName, lastName, group].map((part) => cleanText(part).toLowerCase()).join('|');
}

function cleanText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function findStandById(stands, standId) {
  return stands.find((stand) => stand.id === standId) || stands[0];
}

async function writeState(state) {
  await fs.writeFile(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
}

async function serveStatic(pathname, response) {
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^([.][.][/\\])+/, '');
  safePath = safePath.replace(/^[/\\]+/, '');
  if (safePath === path.sep || safePath === '.') {
    safePath = 'index.html';
  }

  const filePath = path.join(ROOT, safePath);
  const ext = path.extname(filePath).toLowerCase();

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      return serveStatic(path.join(safePath, 'index.html'), response);
    }

    const content = await fs.readFile(filePath);
    response.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(content);
  } catch (error) {
    if (!ext) {
      const indexPath = path.join(ROOT, 'index.html');
      const content = await fs.readFile(indexPath);
      response.writeHead(200, { 'Content-Type': MIME_TYPES['.html'], 'Cache-Control': 'no-store' });
      response.end(content);
      return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
