const APP_VERSION = 2;
const SESSION_KEY = 'feria-ciencias-session-v1';
const SASE_TOKEN_PARAM = 'sase_token';
const TEACHER_PROVIDER = 'sase';
const PRESENCE_TIMEOUT_MINUTES = 18;
const PRESENCE_TIMEOUT_MS = PRESENCE_TIMEOUT_MINUTES * 60 * 1000;
const SIMULATION_INTERVAL_MS = 9000;
const MAX_VISITORS = 500;
const MOVEMENT_LOG_LIMIT = 160;
const ZONE_ORDER = ['Norte', 'Este', 'Sur', 'Oeste'];

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

const CATEGORY_TRIVIA = {
  robotica: {
    question: (stand) => 'En ' + stand.name + ', que componente convierte una orden digital en movimiento fisico?',
    options: ['Actuador', 'Aislante', 'Catalizador', 'Difusor'],
    correctIndex: 0,
    explanation: 'El actuador transforma la senal del sistema en una accion mecanica visible.'
  },
  biologia: {
    question: (stand) => 'Que buena practica asegura una observacion biologica confiable en ' + stand.name + '?',
    options: ['Controlar variables', 'Cambiar muestras sin registro', 'Reducir datos', 'Evitar repetir mediciones'],
    correctIndex: 0,
    explanation: 'Controlar variables mantiene comparables los resultados y evita sesgos.'
  },
  quimica: {
    question: (stand) => 'Que debe verificarse primero antes de mezclar reactivos en ' + stand.name + '?',
    options: ['Compatibilidad y seguridad', 'Color del recipiente', 'Tamano del stand', 'Cantidad de visitantes'],
    correctIndex: 0,
    explanation: 'La compatibilidad de reactivos y las medidas de seguridad van primero.'
  },
  energia: {
    question: (stand) => 'Que variable mejora la comparacion de rendimiento energetico en ' + stand.name + '?',
    options: ['Medir la misma carga', 'Cambiar la fuente a mitad de prueba', 'Usar tiempos distintos', 'Ignorar temperatura'],
    correctIndex: 0,
    explanation: 'Mantener la misma carga permite comparar la eficiencia real de cada prototipo.'
  },
  tecnologia: {
    question: (stand) => 'Cual es el paso minimo para validar una solucion digital en ' + stand.name + '?',
    options: ['Probar con datos reales o simulados', 'Cambiar el logo', 'Ocultar errores', 'Subirla sin revisar'],
    correctIndex: 0,
    explanation: 'Toda solucion digital necesita pruebas observables antes de adoptarse.'
  },
  fisica: {
    question: (stand) => 'Que principio se busca observar con una medicion repetible en ' + stand.name + '?',
    options: ['Relacion entre variables', 'Color favorito del grupo', 'Orden de llegada', 'Tamano del cartel'],
    correctIndex: 0,
    explanation: 'La fisica compara variables para explicar como cambia un sistema.'
  },
  matematica: {
    question: (stand) => 'Que dato ayuda mas a interpretar un patron numerico en ' + stand.name + '?',
    options: ['Serie ordenada y tendencia', 'Color del grafico', 'Volumen del sonido', 'Tamano del aula'],
    correctIndex: 0,
    explanation: 'La serie ordenada muestra regularidades, crecimiento y dispersion.'
  },
  ambiente: {
    question: (stand) => 'Que enfoque fortalece una propuesta ambiental presentada en ' + stand.name + '?',
    options: ['Medir impacto local', 'Usar solo opiniones', 'Ignorar residuos', 'Cambiar de metodo cada dia'],
    correctIndex: 0,
    explanation: 'Medir impacto local permite demostrar mejoras concretas y comparar resultados.'
  },
  tierra: {
    question: (stand) => 'Que variable es clave para interpretar un fenomeno del entorno en ' + stand.name + '?',
    options: ['Ubicacion y contexto', 'Nombre del visitante', 'Tamano del badge', 'Color del fondo'],
    correctIndex: 0,
    explanation: 'Los fenomenos del entorno cambian segun ubicacion, tiempo y contexto.'
  },
  arte: {
    question: (stand) => 'Que valor suma mas a una experiencia creativa con tecnologia en ' + stand.name + '?',
    options: ['Interaccion medible', 'Mas texto sin probar', 'Efectos sin objetivo', 'Datos ocultos'],
    correctIndex: 0,
    explanation: 'La interaccion medible permite evaluar si la experiencia cumple su objetivo.'
  }
};

const STAND_BLUEPRINTS = [
  { id: 1, name: 'Robotica Creativa', zone: 'Norte', category: 'robotica', description: 'Brazos y prototipos movidos por sensores y pequenas rutinas de control.' },
  { id: 2, name: 'Biodiversidad Urbana', zone: 'Norte', category: 'biologia', description: 'Muestras y registros sobre fauna, flora y microecosistemas del barrio.' },
  { id: 3, name: 'Quimica del Color', zone: 'Norte', category: 'quimica', description: 'Cambios de pH, pigmentos y reacciones visibles para comparar sustancias.' },
  { id: 4, name: 'Energia Solar Escolar', zone: 'Norte', category: 'energia', description: 'Paneles pequenos, consumo medido y alternativas para el edificio escolar.' },
  { id: 5, name: 'Laboratorio del Agua', zone: 'Norte', category: 'ambiente', description: 'Filtrado, calidad y sensores simples para monitorear agua reutilizable.' },
  { id: 6, name: 'IA Responsable', zone: 'Norte', category: 'tecnologia', description: 'Modelos de clasificacion, sesgo y uso seguro de asistentes digitales.' },
  { id: 7, name: 'Astronomia Inmersiva', zone: 'Norte', category: 'fisica', description: 'Escalas del sistema solar y trayectorias observadas con simulaciones.' },
  { id: 8, name: 'Domotica y Sensores', zone: 'Este', category: 'robotica', description: 'Automatizacion de luces, alertas y monitoreo con sensores escolares.' },
  { id: 9, name: 'Matematica Visual', zone: 'Este', category: 'matematica', description: 'Patrones, probabilidad y comparacion de datos con paneles interactivos.' },
  { id: 10, name: 'Impresion 3D Escolar', zone: 'Este', category: 'tecnologia', description: 'Piezas funcionales, prototipos y ajustes de diseno para resolver problemas.' },
  { id: 11, name: 'Huerta Hidroponica', zone: 'Este', category: 'biologia', description: 'Crecimiento vegetal sin suelo con control de nutrientes y luz.' },
  { id: 12, name: 'Drones y Cartografia', zone: 'Este', category: 'tecnologia', description: 'Rutas, mapeo de patios y lectura basica de imagenes aereas.' },
  { id: 13, name: 'Nanotecnologia', zone: 'Este', category: 'fisica', description: 'Materiales y propiedades que cambian al trabajar con escalas muy pequenas.' },
  { id: 14, name: 'Realidad Aumentada Educativa', zone: 'Este', category: 'arte', description: 'Capas visuales y experiencias guiadas para explicar contenidos complejos.' },
  { id: 15, name: 'Fisica del Sonido', zone: 'Sur', category: 'fisica', description: 'Frecuencia, vibracion y propagacion observadas con instrumentos y apps.' },
  { id: 16, name: 'Cohetes de Agua', zone: 'Sur', category: 'fisica', description: 'Presion, angulo de salida y alcance comparados en una misma pista.' },
  { id: 17, name: 'Reciclaje Inteligente', zone: 'Sur', category: 'ambiente', description: 'Clasificacion, trazabilidad y propuestas para reducir residuos de la escuela.' },
  { id: 18, name: 'Anatomia Interactiva', zone: 'Sur', category: 'biologia', description: 'Modelos del cuerpo humano con capas, sensores y preguntas guiadas.' },
  { id: 19, name: 'Ciberseguridad Escolar', zone: 'Sur', category: 'tecnologia', description: 'Buenas practicas, contrasenas seguras y deteccion de riesgos comunes.' },
  { id: 20, name: 'Meteorologia Local', zone: 'Sur', category: 'tierra', description: 'Viento, humedad y temperatura registrados por estaciones de bajo costo.' },
  { id: 21, name: 'Videojuegos con Proposito', zone: 'Sur', category: 'arte', description: 'Mecanicas de juego aplicadas a aprendizaje, inclusion y cuidado del entorno.' },
  { id: 22, name: 'Microplasticos al Microscopio', zone: 'Oeste', category: 'quimica', description: 'Comparacion de muestras y observacion de residuos en objetos cotidianos.' },
  { id: 23, name: 'Programacion Creativa', zone: 'Oeste', category: 'tecnologia', description: 'Mini experiencias interactivas que mezclan codigo, sonido y visuales.' },
  { id: 24, name: 'Electronica Basica', zone: 'Oeste', category: 'robotica', description: 'Circuitos simples, continuidad y prototipos para resolver tareas reales.' },
  { id: 25, name: 'Espectroscopia de Prismas', zone: 'Oeste', category: 'fisica', description: 'Luz, dispersion y separacion del espectro con prismas y fuentes controladas.' },
  { id: 26, name: 'Arte Digital Generativa', zone: 'Oeste', category: 'arte', description: 'Patrones visuales producidos por algoritmos y decisiones creativas.' },
  { id: 27, name: 'Conservacion de Suelos', zone: 'Oeste', category: 'ambiente', description: 'Erosion, humedad y practicas de cuidado en maquetas y muestras locales.' },
  { id: 28, name: 'Biotecnologia Alimentaria', zone: 'Oeste', category: 'biologia', description: 'Fermentacion, inocuidad y procesos para transformar alimentos de forma segura.' }
];

const TARGET_CAPACITIES = [16, 16, 18, 16, 18, 19, 17, 19, 16, 17, 17, 20, 18, 18, 17, 20, 17, 16, 18, 17, 19, 16, 17, 18, 19, 17, 16, 17];
const INITIAL_OCCUPANCY = [15, 16, 22, 14, 17, 24, 16, 21, 17, 15, 18, 26, 14, 16, 17, 27, 15, 14, 16, 17, 25, 15, 14, 18, 23, 16, 15, 17];

const appRoot = document.getElementById('app');

const ui = {
  toast: '',
  toastTimer: null,
  listenersBound: false,
  liveStarted: false,
  booting: true,
  bootError: '',
  saseError: ''
};

let state = null;
let session = loadSession();

initTheme();
bootstrap();

function initTheme() {
  const saved = window.localStorage.getItem('feria-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
}

async function bootstrap() {
  if (!ui.listenersBound) {
    window.addEventListener('hashchange', handleRouteChange);
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);
    ui.listenersBound = true;
  }

  await consumeTeacherSessionFromUrl();
  await refreshState({ skipRender: true });
  ui.booting = false;
  ensureRoute();
  startLiveSimulation();
  renderApp();
}

function handleRouteChange() {
  if (!state) {
    renderApp();
    return;
  }

  ensureRoute();
  renderApp();
}

async function loadState() {
  const response = await fetch('./api/state', {
    headers: {
      Accept: 'application/json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('No se pudo cargar el estado del backend.');
  }

  return response.json();
}

async function persistState() {
  if (!state) {
    return null;
  }

  const response = await fetch('./api/state', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(stripClientState(state))
  });

  if (!response.ok) {
    throw new Error('No se pudo guardar el estado en el backend.');
  }

  const nextState = await response.json();
  state = normalizeRemoteState(nextState);
  return state;
}

async function createStudentSession(payload) {
  const response = await fetch('./api/session/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('No se pudo registrar el alumno.');
  }

  return response.json();
}

async function createTeacherSessionFromSase(token) {
  const response = await fetch('./api/session/teacher/sase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token })
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(errorPayload?.message || 'No se pudo validar el acceso docente desde SASE.');
  }

  return response.json();
}

function loadSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return sanitizeSession(raw ? JSON.parse(raw) : null);
  } catch (error) {
    return null;
  }
}

function saveSession(nextSession) {
  session = sanitizeSession(nextSession);

  try {
    if (session) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch (error) {
    // Ignore local persistence errors and keep in-memory session.
  }
}

function sanitizeSession(candidate) {
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  if (candidate.role === 'student' && candidate.userId) {
    return {
      role: 'student',
      userId: String(candidate.userId),
      displayName: String(candidate.displayName || ''),
      group: String(candidate.group || '')
    };
  }

  if (candidate.role === 'teacher' && candidate.provider === TEACHER_PROVIDER && candidate.userId) {
    if (candidate.expiresAt && Date.now() >= Number(candidate.expiresAt)) {
      return null;
    }

    return {
      role: 'teacher',
      provider: TEACHER_PROVIDER,
      userId: String(candidate.userId),
      displayName: String(candidate.displayName || 'Docente'),
      email: String(candidate.email || ''),
      issuedAt: Number(candidate.issuedAt || Date.now()),
      expiresAt: Number(candidate.expiresAt || 0)
    };
  }

  return null;
}

function isTeacherSession(candidate) {
  return Boolean(candidate && candidate.role === 'teacher' && candidate.provider === TEACHER_PROVIDER && candidate.userId);
}

function isStudentSession(candidate) {
  return Boolean(candidate && candidate.role === 'student' && candidate.userId);
}

async function consumeTeacherSessionFromUrl() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get(SASE_TOKEN_PARAM);

  if (!token) {
    return false;
  }

  url.searchParams.delete(SASE_TOKEN_PARAM);
  window.history.replaceState({}, '', url.pathname + url.search + url.hash);

  try {
    const nextSession = await createTeacherSessionFromSase(token);
    saveSession(nextSession);
    ui.saseError = '';
    return true;
  } catch (error) {
    console.error(error);
    saveSession(null);
    ui.saseError = error.message;
    return false;
  }
}

function stripClientState(source) {
  return {
    ...source,
    version: APP_VERSION
  };
}

function normalizeRemoteState(parsed) {
  if (!parsed || !Array.isArray(parsed.visitors) || !Array.isArray(parsed.stands) || parsed.stands.length !== 28) {
    throw new Error('El backend devolvio un estado invalido.');
  }

  return {
    ...parsed,
    version: APP_VERSION,
    announcements: Array.isArray(parsed.announcements) ? parsed.announcements.slice(0, 6) : createDefaultAnnouncements(parsed.createdAt || Date.now()),
    movementLog: Array.isArray(parsed.movementLog) ? parsed.movementLog.slice(0, MOVEMENT_LOG_LIMIT) : buildSeedMovementLog(parsed.visitors, parsed.stands, parsed.createdAt || Date.now())
  };
}

async function refreshState(options = {}) {
  try {
    const nextState = await loadState();
    state = normalizeRemoteState(nextState);
    ui.bootError = '';

    if (!options.skipRoute) {
      ensureRoute();
    }

    if (!options.skipRender) {
      renderApp();
    }

    return true;
  } catch (error) {
    console.error(error);
    if (!state) {
      ui.bootError = 'No se pudo conectar al backend local. Ejecuta `node server.js` y abre `http://localhost:3000`.';
    }

    if (!options.skipRender) {
      renderApp();
    }

    return false;
  }
}

function createInitialState() {
  const now = Date.now();
  const stands = buildStands();
  const standAssignments = expandAssignments(INITIAL_OCCUPANCY);
  const visitors = [];

  for (let index = 0; index < MAX_VISITORS; index += 1) {
    const standId = standAssignments[index];
    visitors.push(createVisitor(index, standId, stands, now));
  }

  return {
    version: APP_VERSION,
    createdAt: now,
    lastSimulationAt: now,
    simulationTick: 0,
    session: null,
    stands,
    visitors,
    announcements: createDefaultAnnouncements(now),
    movementLog: buildSeedMovementLog(visitors, stands, now)
  };
}

function createDefaultAnnouncements(now) {
  return [
    { id: 'a1', type: 'info', text: 'El sistema usa QR por stand para estimar aforo y redistribuir visitantes.', createdAt: now - 4 * 60 * 1000 },
    { id: 'a2', type: 'flow', text: 'Se detecto sobrecarga inicial en Cohetes de Agua y Nanotecnologia. Las recomendaciones ya lo compensan.', createdAt: now - 2 * 60 * 1000 }
  ];
}

function buildStands() {
  return STAND_BLUEPRINTS.map((stand, index) => {
    const meta = CATEGORY_META[stand.category];
    const target = TARGET_CAPACITIES[index];

    return {
      ...stand,
      label: meta.label,
      icon: meta.icon,
      accent: meta.accent,
      accentSoft: meta.soft,
      targetCapacity: target,
      warningCapacity: target + 4,
      maxCapacity: target + 8
    };
  });
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
      name: 'Valentina Rios',
      group: '3B',
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

  const name = FIRST_NAMES[index % FIRST_NAMES.length] + ' ' + LAST_NAMES[(index * 7) % LAST_NAMES.length];
  const group = GROUPS[index % GROUPS.length];
  const preferences = getPreferences(index, stands);
  const visitedCount = 3 + (index % 8);
  const visitedStandIds = buildVisitedStandIds(currentStandId, visitedCount, index);
  const quizAttempts = buildQuizAttempts(visitedStandIds, index, stands, now);

  return {
    id: 'student-' + (index + 1),
    name,
    group,
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

  if (first === second) {
    return [first, stands[(index * 5) % stands.length].category];
  }

  return [first, second];
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

function buildQuizAttempts(visitedStandIds, seed, stands, now) {
  const attempts = {};
  const limit = Math.max(1, Math.floor(visitedStandIds.length / 2));

  visitedStandIds.slice(0, limit).forEach((standId, index) => {
    const quiz = getStandQuiz(findStandById(standId, stands));
    const correct = (seed + standId + index) % 3 !== 0;
    const selectedIndex = correct ? quiz.correctIndex : (quiz.correctIndex + 1) % quiz.options.length;

    attempts[standId] = {
      selectedIndex,
      correct,
      points: correct ? 120 : 40,
      answeredAt: now - ((seed + index) % 80) * 60 * 1000
    };
  });

  return attempts;
}

function buildSeedMovementLog(visitors, stands, now) {
  return visitors
    .slice(0, 120)
    .map((visitor, index) => {
      const toStand = findStandById(visitor.currentStandId, stands);
      const fallbackFrom = visitor.visitedStandIds.length > 1 ? visitor.visitedStandIds[visitor.visitedStandIds.length - 2] : visitor.currentStandId;
      const fromStand = findStandById(fallbackFrom, stands);

      return {
        id: 'seed-' + visitor.id,
        visitorId: visitor.id,
        visitorName: visitor.name,
        group: visitor.group,
        fromStandId: fromStand.id,
        toStandId: toStand.id,
        at: now - ((index % 44) + 1) * 60 * 1000,
        type: fromStand.id === toStand.id ? 'refresh' : 'move',
        reason: index % 4 === 0 ? 'scan' : 'simulation'
      };
    })
    .sort((left, right) => right.at - left.at)
    .slice(0, MOVEMENT_LOG_LIMIT);
}

function ensureRoute() {
  if (!window.location.hash) {
    window.location.hash = session ? defaultHashForSession(session) : '#/login';
    return;
  }

  const route = getRoute();

  if (!session && route.name !== 'login' && route.name !== 'teacher') {
    window.location.hash = '#/login';
    return;
  }

  if (session && route.name === 'login') {
    window.location.hash = defaultHashForSession(session);
    return;
  }

  if (isTeacherSession(session) && route.name !== 'teacher') {
    window.location.hash = '#/docente';
    return;
  }

  if (isStudentSession(session) && route.name === 'teacher') {
    window.location.hash = '#/alumno';
  }
}

function defaultHashForSession(session) {
  return session.role === 'teacher' ? '#/docente' : '#/alumno';
}

function getRoute() {
  const hash = window.location.hash || '#/login';
  const raw = hash.slice(2);
  const parts = raw.split('?');
  const path = parts[0] || 'login';
  const query = parseQuery(parts[1] || '');
  const segments = path.split('/').filter(Boolean);

  if (!segments.length || segments[0] === 'login') {
    return { name: 'login', query };
  }

  if (segments[0] === 'docente') {
    return { name: 'teacher', query };
  }

  if (segments[0] === 'alumno' && segments.length === 1) {
    return { name: 'studentHome', query };
  }

  if (segments[0] === 'alumno' && segments[1] === 'mapa') {
    return { name: 'studentMap', query };
  }

  if (segments[0] === 'alumno' && segments[1] === 'ranking') {
    return { name: 'studentRanking', query };
  }

  if (segments[0] === 'alumno' && segments[1] === 'stand' && segments[2]) {
    return { name: 'studentStand', standId: parseInt(segments[2], 10) || 1, query };
  }

  return { name: 'login', query };
}

function parseQuery(queryText) {
  const params = {};
  if (!queryText) {
    return params;
  }

  queryText.split('&').forEach((pair) => {
    const parts = pair.split('=');
    const key = parts[0];
    const value = parts[1] || '';

    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });

  return params;
}

function renderApp() {
  if (ui.booting) {
    document.title = 'Feria de Ciencias | Cargando';
    appRoot.innerHTML = renderBootState('Conectando con el backend local...', 'Abre `http://localhost:3000` cuando el servidor este listo.') + renderToast();
    return;
  }

  if (ui.bootError) {
    document.title = 'Feria de Ciencias | Backend requerido';
    appRoot.innerHTML = renderBootState('Backend local no disponible', ui.bootError) + renderToast();
    return;
  }

  if (!state) {
    document.title = 'Feria de Ciencias | Esperando datos';
    appRoot.innerHTML = renderBootState('Esperando estado compartido...', 'La app necesita cargar los datos desde el backend.') + renderToast();
    return;
  }

  const route = getRoute();

  if (consumeAutoScan(route)) {
    return;
  }

  const analytics = computeAnalytics();
  const currentVisitor = getCurrentVisitor();

  if (route.name === 'login') {
    document.title = 'Feria de Ciencias | Acceso';
    appRoot.innerHTML = renderLoginView(analytics) + renderToast();
    return;
  }

  if (route.name === 'teacher') {
    if (!isTeacherSession(session)) {
      document.title = 'Feria de Ciencias | Acceso Docente';
      appRoot.innerHTML = renderTeacherGateView() + renderToast();
      return;
    }

    document.title = 'Feria de Ciencias | Panel Docente';
    appRoot.innerHTML = renderTeacherView(analytics) + renderToast();
    return;
  }

  if (!currentVisitor) {
    window.location.hash = '#/login';
    return;
  }

  if (route.name === 'studentMap') {
    document.title = 'Feria de Ciencias | Mapa de Stands';
    appRoot.innerHTML = renderStudentMapView(currentVisitor, analytics) + renderToast();
    return;
  }

  if (route.name === 'studentRanking') {
    document.title = 'Feria de Ciencias | Ranking';
    appRoot.innerHTML = renderStudentRankingView(currentVisitor, analytics) + renderToast();
    return;
  }

  if (route.name === 'studentStand') {
    document.title = 'Feria de Ciencias | Stand ' + formatStandNumber(route.standId);
    appRoot.innerHTML = renderStudentStandView(currentVisitor, analytics, route.standId) + renderToast();
    return;
  }

  document.title = 'Feria de Ciencias | Alumno';
  appRoot.innerHTML = renderStudentHomeView(currentVisitor, analytics) + renderToast();
}

function consumeAutoScan(route) {
  if (route.name !== 'studentStand' || !route.query.scan || !session || session.role !== 'student') {
    return false;
  }

  const visitor = getCurrentVisitor();
  if (!visitor) {
    return false;
  }

  registerCheckIn(visitor, route.standId, true);
  window.location.hash = '#/alumno/stand/' + route.standId;
  window.setTimeout(() => {
    showToast('QR validado. Llegada registrada en el stand ' + formatStandNumber(route.standId) + '.');
  }, 0);
  return true;
}

function computeAnalytics() {
  const now = Date.now();
  const occupancyByStand = {};
  state.stands.forEach((stand) => {
    occupancyByStand[stand.id] = 0;
  });

  const activeVisitors = [];

  state.visitors.forEach((visitor) => {
    if (now - visitor.currentCheckInAt <= PRESENCE_TIMEOUT_MS && occupancyByStand[visitor.currentStandId] !== undefined) {
      occupancyByStand[visitor.currentStandId] += 1;
      activeVisitors.push(visitor);
    }
  });

  const standStats = state.stands.map((stand) => {
    const occupancy = occupancyByStand[stand.id] || 0;
    let status = 'balanced';

    if (occupancy >= stand.maxCapacity) {
      status = 'hot';
    } else if (occupancy >= stand.warningCapacity) {
      status = 'warm';
    } else if (occupancy <= stand.targetCapacity - 3) {
      status = 'low';
    }

    return {
      ...stand,
      occupancy,
      status,
      delta: occupancy - stand.targetCapacity,
      loadPercent: Math.min(100, Math.round((occupancy / stand.maxCapacity) * 100))
    };
  });

  const leaderboard = state.visitors
    .map((visitor) => ({
      visitor,
      score: getVisitorScore(visitor),
      completion: visitor.visitedStandIds.length
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      if (right.completion !== left.completion) {
        return right.completion - left.completion;
      }
      return left.visitor.name.localeCompare(right.visitor.name);
    })
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const zoneStats = buildZoneStats(standStats);
  const redistributionSuggestions = buildRedistributionSuggestions(standStats);
  const recentMovements = (state.movementLog || [])
    .map((item) => enrichMovementEntry(item))
    .sort((left, right) => right.at - left.at)
    .slice(0, 12);

  return {
    now,
    activeVisitors,
    activeCount: activeVisitors.length,
    occupancyByStand,
    standStats,
    leaderboard,
    hottestStands: [...standStats].sort((left, right) => right.occupancy - left.occupancy).slice(0, 4),
    coolestStands: [...standStats].sort((left, right) => left.occupancy - right.occupancy).slice(0, 4),
    zoneStats,
    redistributionSuggestions,
    recentMovements,
    averageOccupancy: Math.round(activeVisitors.length / state.stands.length),
    averageCompletion: Math.round(state.visitors.reduce((sum, visitor) => sum + visitor.visitedStandIds.length, 0) / state.visitors.length),
    saturationCount: standStats.filter((stand) => stand.status === 'hot').length,
    warmCount: standStats.filter((stand) => stand.status === 'warm').length
  };
}

function buildZoneStats(standStats) {
  const zoneMap = {};

  standStats.forEach((stand) => {
    if (!zoneMap[stand.zone]) {
      zoneMap[stand.zone] = {
        name: stand.zone,
        occupancy: 0,
        target: 0,
        hotCount: 0,
        warmCount: 0,
        standCount: 0,
        stands: []
      };
    }

    const zone = zoneMap[stand.zone];
    zone.occupancy += stand.occupancy;
    zone.target += stand.targetCapacity;
    zone.standCount += 1;
    zone.stands.push(stand);

    if (stand.status === 'hot') zone.hotCount += 1;
    if (stand.status === 'warm') zone.warmCount += 1;
  });

  return Object.values(zoneMap)
    .map((zone) => {
      const delta = zone.occupancy - zone.target;
      const hottestStand = [...zone.stands].sort((left, right) => right.occupancy - left.occupancy)[0];
      let status = 'balanced';

      if (zone.hotCount > 0 || delta >= 6) {
        status = 'hot';
      } else if (zone.warmCount > 1 || delta >= 2) {
        status = 'warm';
      } else if (delta <= -4) {
        status = 'low';
      }

      return {
        name: zone.name,
        occupancy: zone.occupancy,
        target: zone.target,
        delta,
        status,
        standCount: zone.standCount,
        hotCount: zone.hotCount,
        warmCount: zone.warmCount,
        hottestStand
      };
    })
    .sort((left, right) => ZONE_ORDER.indexOf(left.name) - ZONE_ORDER.indexOf(right.name));
}

function buildRedistributionSuggestions(standStats) {
  const sources = [...standStats].filter((stand) => stand.delta > 1).sort((left, right) => right.delta - left.delta);
  const targets = [...standStats].filter((stand) => stand.delta < -1).sort((left, right) => left.delta - right.delta);

  return sources.slice(0, 4).map((source) => {
    const sameZoneTarget = targets.find((target) => target.zone === source.zone && target.id !== source.id);
    const target = sameZoneTarget || targets.find((candidate) => candidate.id !== source.id);

    if (!target) {
      return null;
    }

    return {
      source,
      target,
      suggestedCount: clamp(Math.min(Math.ceil(source.delta / 2), target.targetCapacity - target.occupancy), 1, 8)
    };
  }).filter(Boolean);
}

function enrichMovementEntry(entry) {
  const visitor = state.visitors.find((item) => item.id === entry.visitorId);
  const fromStand = findStandById(entry.fromStandId);
  const toStand = findStandById(entry.toStandId);

  return {
    ...entry,
    visitorName: entry.visitorName || (visitor ? visitor.name : 'Visitante'),
    group: entry.group || (visitor ? visitor.group : '--'),
    fromStand,
    toStand
  };
}

function getVisitorScore(visitor) {
  const quizScore = Object.values(visitor.quizAttempts || {}).reduce((sum, attempt) => sum + attempt.points, 0);
  return visitor.visitedStandIds.length * 85 + quizScore + (visitor.bonusPoints || 0);
}

function getCurrentVisitor() {
  if (!isStudentSession(session)) {
    return null;
  }

  return state.visitors.find((visitor) => visitor.id === session.userId) || null;
}

function getRecommendationForVisitor(visitor, standStats, allowVisited) {
  const visited = new Set(visitor.visitedStandIds);
  const currentStand = standStats.find((stand) => stand.id === visitor.currentStandId);
  const candidates = standStats.filter((stand) => {
    if (stand.id === visitor.currentStandId) {
      return false;
    }

    if (stand.occupancy >= stand.maxCapacity) {
      return false;
    }

    if (!allowVisited && visited.has(stand.id)) {
      return false;
    }

    return true;
  });

  if (!candidates.length && !allowVisited) {
    return getRecommendationForVisitor(visitor, standStats, true);
  }

  let best = null;
  let bestScore = -Infinity;

  candidates.forEach((stand) => {
    let score = 0;
    score += (stand.targetCapacity - stand.occupancy) * 5;

    if (stand.status === 'low') score += 20;
    if (stand.status === 'balanced') score += 12;
    if (stand.status === 'warm') score -= 8;
    if (stand.status === 'hot') score -= 18;

    if (!visited.has(stand.id)) score += 16;
    if (visitor.preferences.includes(stand.category)) score += 12;
    if (currentStand && currentStand.zone === stand.zone) score += 8;
    if (currentStand && currentStand.zone !== stand.zone) score += 2;
    score += stand.id / 100;

    if (score > bestScore) {
      best = stand;
      bestScore = score;
    }
  });

  return best || standStats[0];
}

function findStandById(standId, collection) {
  const source = collection || state.stands;
  return source.find((stand) => stand.id === standId) || source[0];
}

function getStandQuiz(stand) {
  const source = stand || state.stands[0];
  const quiz = CATEGORY_TRIVIA[source.category];
  return {
    question: quiz.question(source),
    options: quiz.options,
    correctIndex: quiz.correctIndex,
    explanation: quiz.explanation
  };
}

function registerCheckIn(visitor, standId, silent) {
  moveVisitorToStand(visitor, standId, { now: Date.now(), fromSimulation: false, reason: 'scan' });
  persistState().catch(handleSyncError);

  if (!silent) {
    renderApp();
  }
}

function moveVisitorToStand(visitor, standId, options) {
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

  visitor.avgVisitMinutes = clamp(Math.round(((visitor.avgVisitMinutes || 9) * 3 + 8 + (standId % 6)) / 4), 5, 18);
  recordMovement(visitor, previousStandId, standId, now, options.reason || (options.fromSimulation ? 'simulation' : 'scan'));

  if (options.fromSimulation) {
    maybeCreateAutoAttempt(visitor, standId, now);
  }
}

function recordMovement(visitor, fromStandId, toStandId, timestamp, reason) {
  if (!Array.isArray(state.movementLog)) {
    state.movementLog = [];
  }

  state.movementLog.unshift({
    id: 'm-' + timestamp + '-' + visitor.id + '-' + toStandId,
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

function maybeCreateAutoAttempt(visitor, standId, now) {
  if (!visitor.quizAttempts) {
    visitor.quizAttempts = {};
  }

  if (visitor.quizAttempts[standId]) {
    return;
  }

  const shouldAnswer = (state.simulationTick + standId + visitor.name.length) % 5 === 0;
  if (!shouldAnswer) {
    return;
  }

  const quiz = getStandQuiz(findStandById(standId));
  const correct = (state.simulationTick + standId + visitor.group.length) % 4 !== 0;

  visitor.quizAttempts[standId] = {
    selectedIndex: correct ? quiz.correctIndex : (quiz.correctIndex + 1) % quiz.options.length,
    correct,
    points: correct ? 120 : 40,
    answeredAt: now
  };
}

function advanceSimulationFromElapsedTime() {
  return;
}

function startLiveSimulation() {
  if (ui.liveStarted) {
    return;
  }

  window.setInterval(() => {
    refreshState({ skipRender: true }).then((success) => {
      if (success) {
        renderApp();
      }
    });
  }, Math.max(5000, SIMULATION_INTERVAL_MS - 1000));

  ui.liveStarted = true;
}

function simulateFlow(movementCount, skipPersist) {
  const now = Date.now();

  for (let step = 0; step < movementCount; step += 1) {
    const seed = (state.simulationTick || 0) + step + 1;
    const visitor = pickVisitorForSimulation(seed);
    if (!visitor) {
      continue;
    }

    const analytics = computeAnalytics();
    const recommendation = getRecommendationForVisitor(visitor, analytics.standStats, true);

    if (recommendation && recommendation.id !== visitor.currentStandId) {
      moveVisitorToStand(visitor, recommendation.id, { now, fromSimulation: true, reason: 'simulation' });
    } else {
      visitor.currentCheckInAt = now;
    }
  }

  state.simulationTick = (state.simulationTick || 0) + 1;
  state.lastSimulationAt = now;

  if (!skipPersist) {
    persistState().catch(handleSyncError);
  }
}

function pickVisitorForSimulation(seed) {
  if (!state.visitors.length) {
    return null;
  }

  let index = (seed * 17) % state.visitors.length;
  let visitor = state.visitors[index];

  if (session && session.role === 'student' && visitor.id === session.userId) {
    index = (index + 11) % state.visitors.length;
    visitor = state.visitors[index];
  }

  return visitor;
}

function rebalanceCrowd() {
  let moved = 0;
  const now = Date.now();

  while (moved < 30) {
    const analytics = computeAnalytics();
    const source = [...analytics.standStats].sort((left, right) => right.delta - left.delta)[0];
    const target = [...analytics.standStats]
      .filter((stand) => stand.occupancy < stand.targetCapacity && stand.id !== source.id)
      .sort((left, right) => left.occupancy - right.occupancy)[0];

    if (!source || !target || source.occupancy <= source.targetCapacity) {
      break;
    }

    const visitor = state.visitors.find((item) => item.currentStandId === source.id && (!session || item.id !== session.userId));
    if (!visitor) {
      break;
    }

    moveVisitorToStand(visitor, target.id, { now, fromSimulation: true, reason: 'rebalancing' });
    moved += 1;
  }

  if (moved) {
    addAnnouncement('Coordinacion redirigio ' + moved + ' visitantes hacia stands con baja afluencia.', 'rebalancing');
    persistState().catch(handleSyncError);
    showToast('Redistribucion ejecutada: ' + moved + ' visitantes movidos.');
    renderApp();
  }
}

function publishReminder() {
  addAnnouncement('Recordatorio general: al llegar a un stand, escanea el QR para mantener el mapa en tiempo real.', 'broadcast');
  persistState().catch(handleSyncError);
  showToast('Aviso general publicado.');
  renderApp();
}

function addAnnouncement(text, type) {
  state.announcements.unshift({
    id: 'a' + Date.now(),
    type: type || 'info',
    text,
    createdAt: Date.now()
  });

  state.announcements = state.announcements.slice(0, 6);
}

function handleClick(event) {
  const actionTarget = event.target.closest('[data-action]');
  if (!actionTarget) {
    return;
  }

  const action = actionTarget.dataset.action;

  if (action === 'logout') {
    saveSession(null);
    window.location.hash = '#/login';
    showToast('Sesion cerrada.');
    return;
  }

  if (action === 'toggle-theme') {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    window.localStorage.setItem('feria-theme', isDark ? 'dark' : 'light');
    renderApp();
    return;
  }

  if (action === 'check-in') {
    const visitor = getCurrentVisitor();
    if (!visitor) {
      return;
    }

    const standId = parseInt(actionTarget.dataset.standId, 10);
    registerCheckIn(visitor, standId, true);
    showToast('Llegada registrada en el stand ' + formatStandNumber(standId) + '.');
    window.location.hash = '#/alumno/stand/' + standId;
    return;
  }

  if (action === 'answer-quiz') {
    const visitor = getCurrentVisitor();
    if (!visitor) {
      return;
    }

    const standId = parseInt(actionTarget.dataset.standId, 10);
    const selectedIndex = parseInt(actionTarget.dataset.optionIndex, 10);
    answerQuiz(visitor, standId, selectedIndex);
    return;
  }

  if (action === 'simulate-tick') {
    simulateFlow(22);
    addAnnouncement('Se simulo una nueva ola de movimientos para revisar el balance del patio.', 'flow');
    persistState().catch(handleSyncError);
    showToast('Se simulo un nuevo bloque de movimiento.');
    renderApp();
    return;
  }

  if (action === 'rebalance') {
    rebalanceCrowd();
    return;
  }

  if (action === 'broadcast') {
    publishReminder();
  }
}

function handleSubmit(event) {
  const form = event.target.closest('[data-form]');
  if (!form) {
    return;
  }

  if (form.dataset.form !== 'login') {
    return;
  }

  event.preventDefault();

  const data = new FormData(form);
  const firstName = cleanText(data.get('firstName'));
  const lastName = cleanText(data.get('lastName'));
  const group = cleanText(data.get('group'));

  createStudentSession({ firstName, lastName, group })
    .then((nextSession) => {
      saveSession(nextSession);
      return refreshState({ skipRoute: true, skipRender: true });
    })
    .then(() => {
      showToast('Ingreso como alumno registrado.');
      window.location.hash = '#/alumno';
    })
    .catch((error) => {
      console.error(error);
      showToast('Completa nombre, apellido y grupo para entrar.');
    });
}

function answerQuiz(visitor, standId, selectedIndex) {
  if (!visitor.quizAttempts) {
    visitor.quizAttempts = {};
  }

  if (!visitor.quizAttempts[standId]) {
    if (visitor.currentStandId !== standId) {
      moveVisitorToStand(visitor, standId, { now: Date.now(), fromSimulation: false, reason: 'quiz' });
    }

    const quiz = getStandQuiz(findStandById(standId));
    const correct = selectedIndex === quiz.correctIndex;

    visitor.quizAttempts[standId] = {
      selectedIndex,
      correct,
      points: correct ? 120 : 40,
      answeredAt: Date.now()
    };

    if (correct) {
      visitor.bonusPoints = (visitor.bonusPoints || 0) + 12;
      showToast('Respuesta correcta. Sumaste 120 puntos.');
    } else {
      showToast('Respuesta registrada. Sumaste 40 puntos.');
    }

    persistState().catch(handleSyncError);
    renderApp();
  }
}

function renderLoginView(analytics) {
  const hottest = analytics.hottestStands[0];
  const coolest = analytics.coolestStands[0];

  return `
    <div class='page-shell'>
      <main class='page-content page-content--login'>
        <section class='login-grid'>
          <article class='glass hero-card'>
            <p class='eyebrow'>Feria de Ciencias 2026</p>
            <h2>App funcional para repartir 500 visitantes entre 28 stands.</h2>
            <p class='subtitle'>Este MVP usa QR por stand para registrar ubicacion, recomiendas el siguiente destino segun aforo y expone un panel docente para reequilibrar el flujo.</p>
            <div class='stat-strip'>
              ${renderStatPill('Visitantes', String(MAX_VISITORS))}
              ${renderStatPill('Stands', '28')}
              ${renderStatPill('Timeout activo', PRESENCE_TIMEOUT_MINUTES + ' min')}
              ${renderStatPill('Promedio actual', analytics.averageOccupancy + ' por stand')}
            </div>
            <div class='grid-2'>
              <div class='summary-card'>
                <p class='mini-label'>Mayor presion</p>
                <strong class='summary-number'>${escapeHtml(hottest.name)}</strong>
                <p class='metric-copy'>${hottest.occupancy} visitantes en ${escapeHtml(hottest.zone)}.</p>
              </div>
              <div class='summary-card'>
                <p class='mini-label'>Mejor opcion libre</p>
                <strong class='summary-number'>${escapeHtml(coolest.name)}</strong>
                <p class='metric-copy'>${coolest.occupancy} visitantes. Ideal para redirigir.</p>
              </div>
            </div>
          </article>
          <article class='glass form-card'>
            <p class='eyebrow'>Acceso de alumnos</p>
            <h2>Entrar a la feria</h2>
            <p class='subtitle'>Los alumnos entran aqui con nombre, apellido y grupo. El panel docente ya no se habilita desde esta pantalla publica.</p>
            <form data-form='login'>
              <div class='field-grid'>
                <label class='field'>
                  <span>Nombre</span>
                  <input class='input' type='text' name='firstName' placeholder='Valentina'>
                </label>
                <label class='field'>
                  <span>Apellido</span>
                  <input class='input' type='text' name='lastName' placeholder='Rios'>
                </label>
                <label class='field'>
                  <span>Grupo</span>
                  <input class='input' type='text' name='group' placeholder='3B'>
                </label>
              </div>
              <button class='button button--wide' type='submit'>Entrar al MVP</button>
            </form>
            <div class='summary-card'>
              <p class='mini-label'>Acceso docente</p>
              <strong class='summary-number'>Solo por SASE</strong>
              <p class='metric-copy'>Los maestros deben entrar desde SASE para abrir el dashboard docente de la feria.</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  `;
}

function renderStudentHomeView(visitor, analytics) {
  const currentStand = analytics.standStats.find((stand) => stand.id === visitor.currentStandId);
  const recommendation = getRecommendationForVisitor(visitor, analytics.standStats, false);
  const progress = Math.round((visitor.visitedStandIds.length / 28) * 100);
  const rankingEntry = analytics.leaderboard.find((entry) => entry.visitor.id === visitor.id);
  const latestAnnouncement = state.announcements[0];
  const visitorMoves = analytics.recentMovements.filter((item) => item.visitorId === visitor.id).slice(0, 4);
  const currentZone = analytics.zoneStats.find((zone) => zone.name === currentStand.zone);
  const recommendedZone = analytics.zoneStats.find((zone) => zone.name === recommendation.zone);
  const currentZoneName = currentZone ? currentZone.name : '';
  const recommendedZoneName = recommendedZone ? recommendedZone.name : '';

  return renderStudentLayout({
    title: 'Tu ruta recomendada',
    subtitle: 'El motor busca stands con menor carga, evita saturaciones y distribuye a todos los visitantes.',
    activeNav: 'home',
    visitor,
    content: `
      ${renderAnnouncement(latestAnnouncement)}
      <section class='hero-grid'>
        <article class='glass hero-card'>
          <p class='eyebrow'>Siguiente mejor paso</p>
          <h2>Ve a ${escapeHtml(recommendation.name)}</h2>
          <p class='subtitle'>${escapeHtml(recommendation.zone)}. Tiene ${recommendation.occupancy} visitantes, por debajo de su meta de ${recommendation.targetCapacity}. Esto ayuda a descongestionar la feria.</p>
          <div class='grid-2'>
            <div class='summary-card'>
              <p class='mini-label'>Tu progreso</p>
              <strong class='summary-number'>${visitor.visitedStandIds.length} de 28</strong>
              <div class='progress-bar'><span class='progress-fill' style='width: ${progress}%'></span></div>
            </div>
            <div class='summary-card'>
              <p class='mini-label'>Puesto actual</p>
              <strong class='summary-number'>#${rankingEntry.rank}</strong>
              <p class='metric-copy'>${rankingEntry.score} puntos acumulados.</p>
            </div>
          </div>
          <div class='hero-actions'>
            <a class='button' href='#/alumno/stand/${recommendation.id}'>Abrir stand sugerido</a>
            <button class='button button--secondary' data-action='check-in' data-stand-id='${currentStand.id}'>Validar QR actual</button>
          </div>
        </article>
        <div class='metrics-grid'>
          ${renderMetricCard('Mi ubicacion', formatStandLabel(currentStand.id), escapeHtml(currentStand.name), 'place_item')}
          ${renderMetricCard('Aforo actual', String(currentStand.occupancy), 'Meta ' + currentStand.targetCapacity, 'groups')}
          ${renderMetricCard('Promedio visita', String(visitor.avgVisitMinutes) + ' min', 'Tiempo medio personal', 'schedule')}
          ${renderMetricCard('Mejor zona', escapeHtml(recommendation.zone), 'Baja afluencia ahora', 'explore')}
        </div>
      </section>
      <section class='grid-2'>
        ${renderQuickCard('Mapa de stands', 'Revisa ocupacion, zona y botones de QR para los 28 stands.', '#/alumno/mapa', 'map')}
        ${renderQuickCard('Ranking en vivo', 'Compara avance, puntos y posicion frente al resto de visitantes.', '#/alumno/ranking', 'leaderboard')}
      </section>
      <section class='grid-2'>
        <article class='glass section'>
          <div class='section-header'>
            <div>
              <p class='eyebrow'>Balance por zonas</p>
              <h2 class='section-title'>Donde conviene moverse</h2>
            </div>
          </div>
          <div class='list-stack'>
            ${analytics.zoneStats.map((zone) => renderZoneRow(zone, zone.name === currentZoneName, zone.name === recommendedZoneName)).join('')}
          </div>
        </article>
        <article class='glass section'>
          <div class='section-header'>
            <div>
              <p class='eyebrow'>Trazabilidad</p>
              <h2 class='section-title'>Tus ultimos movimientos</h2>
            </div>
          </div>
          <div class='list-stack'>
            ${visitorMoves.length ? visitorMoves.map((entry) => renderMovementRow(entry, true)).join('') : `<div class='list-item'><div class='row-text'><span class='rank-name'>Sin movimientos recientes</span><span class='row-subtitle'>Tu proximo check-in aparecera aqui.</span></div></div>`}
          </div>
        </article>
      </section>
      <section class='glass section'>
        <div class='section-header'>
          <div>
            <p class='eyebrow'>Vista rapida</p>
            <h2 class='section-title'>Mapa condensado</h2>
          </div>
          <div class='legend'>
            ${renderLegendItem('low', 'Baja')}
            ${renderLegendItem('balanced', 'Equilibrado')}
            ${renderLegendItem('warm', 'En subida')}
            ${renderLegendItem('hot', 'Saturado')}
          </div>
        </div>
        <div class='stand-grid'>
          ${analytics.standStats.slice(0, 8).map((stand) => renderStandCard(stand, visitor, recommendation.id)).join('')}
        </div>
      </section>
    `
  });
}

function renderStudentMapView(visitor, analytics) {
  const recommendation = getRecommendationForVisitor(visitor, analytics.standStats, false);

  return renderStudentLayout({
    title: 'Mapa operativo de la feria',
    subtitle: 'Cada tarjeta muestra aforo vivo, estado y acceso rapido al QR del stand.',
    activeNav: 'map',
    visitor,
    content: `
      ${renderPhysicalMapPanel(analytics.standStats, {
        title: 'Plano fisico del recinto',
        subtitle: 'Posiciones editables desde `data/stands.json` mientras llegan los stands reales.',
        currentStandId: visitor.currentStandId,
        recommendedId: recommendation.id,
        interactive: true
      })}
      <section class='glass section'>
        <div class='section-header'>
          <div>
            <p class='eyebrow'>Distribucion viva</p>
            <h2 class='section-title'>28 stands monitoreados</h2>
          </div>
          <div class='legend'>
            ${renderLegendItem('low', 'Baja afluencia')}
            ${renderLegendItem('balanced', 'Meta estable')}
            ${renderLegendItem('warm', 'Subiendo')}
            ${renderLegendItem('hot', 'Requiere desvio')}
          </div>
        </div>
        <div class='stand-grid'>
          ${analytics.standStats.map((stand) => renderStandCard(stand, visitor, recommendation.id)).join('')}
        </div>
      </section>
    `
  });
}

function renderStudentRankingView(visitor, analytics) {
  const rankingEntry = analytics.leaderboard.find((entry) => entry.visitor.id === visitor.id);

  return renderStudentLayout({
    title: 'Ranking en vivo',
    subtitle: 'El puntaje combina stands visitados, trivia respondida y avance del recorrido.',
    activeNav: 'ranking',
    visitor,
    content: `
      <section class='grid-2'>
        <div class='summary-card'>
          <p class='mini-label'>Tu posicion</p>
          <strong class='summary-number'>#${rankingEntry.rank}</strong>
          <p class='metric-copy'>${rankingEntry.score} puntos y ${visitor.visitedStandIds.length} stands visitados.</p>
        </div>
        <div class='summary-card'>
          <p class='mini-label'>Promedio global</p>
          <strong class='summary-number'>${analytics.averageCompletion} stands</strong>
          <p class='metric-copy'>Promedio de recorrido entre los 500 visitantes.</p>
        </div>
      </section>
      <section class='glass section'>
        <div class='section-header'>
          <div>
            <p class='eyebrow'>Tabla general</p>
            <h2 class='section-title'>Top 15 visitantes</h2>
          </div>
        </div>
        <div class='ranking-list'>
          ${analytics.leaderboard.slice(0, 15).map((entry) => renderRankingRow(entry, visitor.id)).join('')}
        </div>
      </section>
    `
  });
}

function renderStudentStandView(visitor, analytics, standId) {
  const stand = analytics.standStats.find((item) => item.id === standId) || analytics.standStats[0];
  const quiz = getStandQuiz(stand);
  const attempt = visitor.quizAttempts[stand.id];
  const recommendation = getRecommendationForVisitor(visitor, analytics.standStats, false);
  const qrLink = window.location.href.split('#')[0] + '#/alumno/stand/' + stand.id + '?scan=1';

  return renderStudentLayout({
    title: formatStandLabel(stand.id) + ' · ' + stand.name,
    subtitle: 'Detalle del stand, check-in QR y trivia vinculada al recorrido.',
    activeNav: 'stand',
    visitor,
    content: `
      <section class='detail-grid'>
        <article class='glass stand-focus' style='--accent: ${stand.accent}; --accent-soft: ${stand.accentSoft};'>
          <p class='eyebrow'>${escapeHtml(stand.label)} · ${escapeHtml(stand.zone)}</p>
          <h2>${escapeHtml(stand.name)}</h2>
          <p class='stand-copy'>${escapeHtml(stand.description)}</p>
          <div class='grid-2'>
            <div class='summary-card'>
              <p class='mini-label'>Aforo en vivo</p>
              <strong class='summary-number'>${stand.occupancy}</strong>
              <p class='metric-copy'>Meta ideal ${stand.targetCapacity}. Maximo ${stand.maxCapacity}.</p>
            </div>
            <div class='summary-card'>
              <p class='mini-label'>Estado</p>
              <span class='status-pill status-pill--${stand.status}'>${getStatusLabel(stand.status)}</span>
              <p class='metric-copy'>Ayuda a mantener el mapa preciso validando tu llegada.</p>
            </div>
          </div>
          <div class='stand-actions'>
            <button class='button' data-action='check-in' data-stand-id='${stand.id}'>Registrar llegada</button>
            <a class='button button--secondary' href='#/alumno/stand/${recommendation.id}'>Ir al siguiente sugerido</a>
          </div>
          <div class='code-card'>
            <span>QR demo</span>
            <code>${escapeHtml(qrLink)}</code>
          </div>
        </article>
        <div class='detail-aside'>
          <div class='summary-card'>
            <p class='mini-label'>Tu avance en este stand</p>
            <strong class='summary-number'>${attempt ? 'Trivia hecha' : 'Pendiente'}</strong>
            <p class='metric-copy'>${attempt ? 'Ya registraste tu respuesta y sumaste puntos.' : 'Responde la trivia para consolidar puntos en el ranking.'}</p>
          </div>
          <div class='summary-card'>
            <p class='mini-label'>Siguiente mejor zona</p>
            <strong class='summary-number'>${escapeHtml(recommendation.zone)}</strong>
            <p class='metric-copy'>El sistema sugiere ${escapeHtml(recommendation.name)} para equilibrar aforo.</p>
          </div>
        </div>
      </section>
      <section class='glass quiz-card'>
        <p class='eyebrow'>Trivia del stand</p>
        <h2>${escapeHtml(quiz.question)}</h2>
        <div class='option-list'>
          ${quiz.options.map((option, index) => renderQuizOption(option, index, stand.id, quiz, attempt)).join('')}
        </div>
        ${attempt ? `<p class='metric-copy'>${escapeHtml(quiz.explanation)}</p>` : `<p class='metric-copy'>Una respuesta correcta vale 120 puntos. Una respuesta incorrecta suma 40 puntos y no bloquea tu recorrido.</p>`}
      </section>
    `
  });
}

function renderTeacherView(analytics) {
  const hottest = analytics.hottestStands[0];
  const coolest = analytics.coolestStands[0];

  return `
    <div class='page-shell'>
      <header class='glass topbar'>
        <div class='brand-block'>
          <div class='brand-mark'><span class='material-symbols-outlined'>school</span></div>
          <div>
            <div class='brand-kicker'>Panel Docente</div>
            <div class='brand-title'>Feria de Ciencias</div>
            <div class='brand-subtitle'>Control de flujo, ranking y redistribucion</div>
          </div>
        </div>
        <div class='title-inline'>
          <div class='user-chip'>
            <span class='material-symbols-outlined'>admin_panel_settings</span>
            <span><strong>Coordinacion</strong> · modo docente</span>
          </div>
          ${renderThemeToggle()}
          <button class='icon-button' data-action='logout' aria-label='Cerrar sesion'>
            <span class='material-symbols-outlined'>logout</span>
          </button>
        </div>
      </header>
      <main class='page-content'>
        <section class='title-strip'>
          <p class='eyebrow'>Operacion en vivo</p>
          <h1>Distribucion de visitantes y stands calientes</h1>
          <p class='subtitle'>El panel resume aforo, ranking y acciones directas para redistribuir a los visitantes segun la presion de cada stand.</p>
        </section>
        <section class='metrics-grid'>
          ${renderMetricCard('Visitantes activos', String(analytics.activeCount), 'Sobre ' + MAX_VISITORS + ' en la feria', 'groups')}
          ${renderMetricCard('Stands saturados', String(analytics.saturationCount), 'Mas ' + analytics.warmCount + ' en subida', 'warning')}
          ${renderMetricCard('Stand mas libre', formatStandLabel(coolest.id), coolest.name, 'explore')}
          ${renderMetricCard('Stand mas cargado', formatStandLabel(hottest.id), hottest.name, 'insights')}
        </section>
        <section class='zone-grid'>
          ${analytics.zoneStats.map((zone) => renderZoneCard(zone)).join('')}
        </section>
        ${renderPhysicalMapPanel(analytics.standStats, {
          title: 'Plano fisico de stands',
          subtitle: 'El backend entrega el catalogo y este plano se mueve editando coordenadas en `data/stands.json`.',
          currentStandId: 0,
          recommendedId: 0,
          interactive: false
        })}
        <section class='glass section'>
          <div class='action-row'>
            <button class='button' data-action='rebalance'>Redistribuir 30 visitantes</button>
            <button class='button button--secondary' data-action='simulate-tick'>Simular nueva ola</button>
            <button class='button button--secondary' data-action='broadcast'>Publicar aviso general</button>
          </div>
        </section>
        <section class='teacher-grid'>
          <article class='glass section span-2'>
            <div class='section-header'>
              <div>
                <p class='eyebrow'>Matriz de ocupacion</p>
                <h2 class='section-title'>Todos los stands</h2>
              </div>
              <div class='legend'>
                ${renderLegendItem('low', 'Baja')}
                ${renderLegendItem('balanced', 'Meta')}
                ${renderLegendItem('warm', 'Subiendo')}
                ${renderLegendItem('hot', 'Hot')}
              </div>
            </div>
            <div class='matrix-grid'>
              ${analytics.standStats.map((stand) => renderMatrixTile(stand)).join('')}
            </div>
          </article>
          <article class='glass section'>
            <div class='section-header'>
              <div>
                <p class='eyebrow'>Prioridad alta</p>
                <h2 class='section-title'>Mas cargados</h2>
              </div>
            </div>
            <div class='list-stack'>
              ${analytics.hottestStands.map((stand) => renderBalanceRow(stand, 'hot')).join('')}
            </div>
          </article>
          <article class='glass section'>
            <div class='section-header'>
              <div>
                <p class='eyebrow'>Oportunidad</p>
                <h2 class='section-title'>Mas libres</h2>
              </div>
            </div>
            <div class='list-stack'>
              ${analytics.coolestStands.map((stand) => renderBalanceRow(stand, 'low')).join('')}
            </div>
          </article>
          <article class='glass section span-2'>
            <div class='section-header'>
              <div>
                <p class='eyebrow'>Decision sugerida</p>
                <h2 class='section-title'>Desvios recomendados</h2>
              </div>
            </div>
            <div class='grid-2 grid-2--tight'>
              <div class='list-stack'>
                ${analytics.redistributionSuggestions.length ? analytics.redistributionSuggestions.map((item) => renderSuggestionRow(item)).join('') : `<div class='list-item'><div class='row-text'><span class='rank-name'>Sin desvios sugeridos</span><span class='row-subtitle'>Los stands estan cerca de su meta actual.</span></div></div>`}
              </div>
              <div class='list-stack'>
                ${analytics.recentMovements.slice(0, 6).map((item) => renderMovementRow(item, false)).join('')}
              </div>
            </div>
          </article>
          <article class='glass section span-2'>
            <div class='section-header'>
              <div>
                <p class='eyebrow'>Top visitantes</p>
                <h2 class='section-title'>Ranking global</h2>
              </div>
            </div>
            <div class='ranking-list'>
              ${analytics.leaderboard.slice(0, 10).map((entry) => renderRankingRow(entry, '')).join('')}
            </div>
          </article>
          <article class='glass section'>
            <div class='section-header'>
              <div>
                <p class='eyebrow'>Mensajes</p>
                <h2 class='section-title'>Ultimos avisos</h2>
              </div>
            </div>
            <div class='list-stack'>
              ${state.announcements.map((item) => renderAnnouncementRow(item)).join('')}
            </div>
          </article>
        </section>
      </main>
    </div>
  `;
}

function renderStudentLayout(config) {
  return `
    <div class='page-shell'>
      <header class='glass topbar'>
        <div class='brand-block'>
          <div class='brand-mark'><span class='material-symbols-outlined'>science</span></div>
          <div>
            <div class='brand-kicker'>Alumno</div>
            <div class='brand-title'>Feria de Ciencias</div>
            <div class='brand-subtitle'>QR por stand y recomendacion de flujo</div>
          </div>
        </div>
        <div class='title-inline'>
          <div class='user-chip'>
            <span class='material-symbols-outlined'>account_circle</span>
            <span><strong>${escapeHtml(config.visitor.name)}</strong> · ${escapeHtml(config.visitor.group)}</span>
          </div>
          ${renderThemeToggle()}
          <button class='icon-button' data-action='logout' aria-label='Cerrar sesion'>
            <span class='material-symbols-outlined'>logout</span>
          </button>
        </div>
      </header>
      <main class='page-content'>
        <section class='title-strip'>
          <p class='eyebrow'>Visita guiada</p>
          <h1>${escapeHtml(config.title)}</h1>
          <p class='subtitle'>${escapeHtml(config.subtitle)}</p>
        </section>
        ${config.content}
      </main>
      <nav class='glass bottom-nav'>
        ${renderBottomLink('#/alumno', 'home', 'home', config.activeNav === 'home')}
        ${renderBottomLink('#/alumno/mapa', 'map', 'map', config.activeNav === 'map')}
        ${renderBottomLink('#/alumno/ranking', 'leaderboard', 'ranking', config.activeNav === 'ranking')}
        ${renderBottomLink('#/alumno/stand/' + config.visitor.currentStandId, 'qr_code_scanner', 'stand', config.activeNav === 'stand')}
      </nav>
    </div>
  `;
}

function renderBottomLink(href, icon, label, active) {
  return `
    <a class='bottom-nav__link${active ? ' is-active' : ''}' href='${href}'>
      <span class='material-symbols-outlined'>${icon}</span>
      <span class='bottom-nav__label'>${label}</span>
    </a>
  `;
}

function renderThemeToggle() {
  const isDark = document.documentElement.classList.contains('dark');
  return `
    <button class='icon-button' data-action='toggle-theme' aria-label='Cambiar tema'>
      <span class='material-symbols-outlined'>${isDark ? 'light_mode' : 'dark_mode'}</span>
    </button>
  `;
}

function renderMetricCard(label, value, copy, icon) {
  return `
    <article class='metric-card'>
      <div class='metric-head'>
        <span class='metric-label'>${escapeHtml(label)}</span>
        <span class='metric-icon'><span class='material-symbols-outlined'>${icon}</span></span>
      </div>
      <strong class='metric-value'>${escapeHtml(value)}</strong>
      <p class='metric-copy'>${escapeHtml(copy)}</p>
    </article>
  `;
}

function renderQuickCard(title, copy, href, icon) {
  return `
    <a class='quick-card' href='${href}'>
      <div class='quick-card__top'>
        <div>
          <p class='mini-label'>Acceso rapido</p>
          <h3>${escapeHtml(title)}</h3>
        </div>
        <span class='quick-card__icon'><span class='material-symbols-outlined'>${icon}</span></span>
      </div>
      <p>${escapeHtml(copy)}</p>
    </a>
  `;
}

function renderAnnouncement(item) {
  if (!item) {
    return '';
  }

  return `
    <div class='announcement-card'>
      <div>
        <p class='mini-label'>Aviso reciente</p>
        <p class='announcement-copy'>${escapeHtml(item.text)}</p>
      </div>
      <span class='status-pill status-pill--balanced'>${formatTimeAgo(item.createdAt)}</span>
    </div>
  `;
}

function renderAnnouncementRow(item) {
  return `
    <div class='list-item'>
      <div class='row-main'>
        <div class='rank-circle'>${escapeHtml(item.type.slice(0, 1).toUpperCase())}</div>
        <div class='row-text'>
          <span class='rank-name'>${escapeHtml(item.text)}</span>
          <span class='row-subtitle'>${formatTimeAgo(item.createdAt)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderPhysicalMapPanel(stands, options) {
  return `
    <section class='glass section'>
      <div class='section-header'>
        <div>
          <p class='eyebrow'>Mapa del recinto</p>
          <h2 class='section-title'>${escapeHtml(options.title)}</h2>
        </div>
      </div>
      <p class='metric-copy'>${escapeHtml(options.subtitle)}</p>
      <div class='floor-map'>
        <div class='floor-map__canvas'>
          <div class='floor-map__stage'>Entrada / acreditacion</div>
          <div class='floor-map__plaza'>Plaza central y circulacion</div>
          <div class='floor-map__zone floor-map__zone--north'>Norte</div>
          <div class='floor-map__zone floor-map__zone--east'>Este</div>
          <div class='floor-map__zone floor-map__zone--south'>Sur</div>
          <div class='floor-map__zone floor-map__zone--west'>Oeste</div>
          ${stands.map((stand) => renderMapStand(stand, options)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderMapStand(stand, options) {
  const classes = [
    'floor-map__stand',
    `floor-map__stand--${stand.status}`,
    stand.id === options.currentStandId ? 'is-current' : '',
    stand.id === options.recommendedId ? 'is-recommended' : ''
  ].filter(Boolean).join(' ');
  const style = `left:${stand.map.x}%; top:${stand.map.y}%; width:${stand.map.w}%; height:${stand.map.h}%; --stand-accent:${stand.accent};`;
  const inner = `
    <span class='floor-map__stand-id'>${formatStandNumber(stand.id)}</span>
    <span class='floor-map__stand-name'>${escapeHtml(stand.name)}</span>
    <span class='floor-map__stand-meta'>${stand.occupancy} visitantes</span>
  `;

  if (options.interactive) {
    return `<a class='${classes}' style='${style}' href='#/alumno/stand/${stand.id}'>${inner}</a>`;
  }

  return `<div class='${classes}' style='${style}'>${inner}</div>`;
}

function renderZoneCard(zone) {
  return `
    <article class='zone-card zone-card--${zone.status}'>
      <div class='zone-card__head'>
        <span class='tag'>${escapeHtml(zone.name)}</span>
        <span class='status-pill status-pill--${zone.status}'>${getStatusLabel(zone.status)}</span>
      </div>
      <strong class='zone-card__value'>${zone.occupancy} / ${zone.target}</strong>
      <p class='metric-copy'>${zone.standCount} stands · mas presion en ${escapeHtml(zone.hottestStand.name)}</p>
    </article>
  `;
}

function renderZoneRow(zone, isCurrentZone, isRecommendedZone) {
  const marker = isCurrentZone ? 'Actual' : isRecommendedZone ? 'Sugerida' : getStatusLabel(zone.status);

  return `
    <div class='list-item${isCurrentZone ? ' is-active' : ''}'>
      <div class='row-main'>
        <div class='rank-circle'>${escapeHtml(zone.name.slice(0, 1))}</div>
        <div class='row-text'>
          <span class='rank-name'>${escapeHtml(zone.name)}</span>
          <span class='row-subtitle'>${zone.occupancy} visitantes sobre meta ${zone.target}</span>
        </div>
      </div>
      <div class='row-score'>
        <strong>${escapeHtml(marker)}</strong>
      </div>
    </div>
  `;
}

function renderMovementRow(entry, compact) {
  const title = compact
    ? `${formatStandLabel(entry.fromStand.id)} -> ${formatStandLabel(entry.toStand.id)}`
    : entry.visitorName;

  const subtitle = compact
    ? `${escapeHtml(entry.toStand.name)} · ${formatTimeAgo(entry.at)}`
    : `${formatStandLabel(entry.fromStand.id)} -> ${formatStandLabel(entry.toStand.id)} · ${escapeHtml(entry.group)} · ${formatTimeAgo(entry.at)}`;

  return `
    <div class='list-item'>
      <div class='row-main'>
        <div class='rank-circle'>${escapeHtml(getMovementShortLabel(entry.reason))}</div>
        <div class='row-text'>
          <span class='rank-name'>${escapeHtml(title)}</span>
          <span class='row-subtitle'>${subtitle}</span>
        </div>
      </div>
      <div class='row-score'>
        <strong>${escapeHtml(getMovementLabel(entry.reason))}</strong>
      </div>
    </div>
  `;
}

function renderSuggestionRow(item) {
  return `
    <div class='list-item'>
      <div class='row-main'>
        <div class='rank-circle'>${item.suggestedCount}</div>
        <div class='row-text'>
          <span class='rank-name'>${escapeHtml(item.source.name)} -> ${escapeHtml(item.target.name)}</span>
          <span class='row-subtitle'>Mover ${item.suggestedCount} visitantes desde ${escapeHtml(item.source.zone)} hacia ${escapeHtml(item.target.zone)}</span>
        </div>
      </div>
      <div class='row-score'>
        <strong>${formatStandNumber(item.source.id)}:${formatStandNumber(item.target.id)}</strong>
      </div>
    </div>
  `;
}

function renderBootState(title, copy) {
  return `
    <div class='page-shell'>
      <main class='page-content page-content--login'>
        <section class='login-grid'>
          <article class='glass hero-card'>
            <p class='eyebrow'>Estado del sistema</p>
            <h2>${escapeHtml(title)}</h2>
            <p class='subtitle'>${escapeHtml(copy)}</p>
            <div class='code-card'>
              <span>Comando</span>
              <code>node server.js</code>
            </div>
          </article>
        </section>
      </main>
    </div>
  `;
}

function renderTeacherGateView() {
  const copy = ui.saseError || 'El panel docente solo se abre con una sesion valida proveniente de SASE.';

  return `
    <div class='page-shell'>
      <main class='page-content page-content--login'>
        <section class='login-grid'>
          <article class='glass hero-card'>
            <p class='eyebrow'>Acceso docente protegido</p>
            <h2>Los maestros deben ingresar desde SASE</h2>
            <p class='subtitle'>${escapeHtml(copy)}</p>
            <div class='grid-2'>
              <div class='summary-card'>
                <p class='mini-label'>Alumnos</p>
                <strong class='summary-number'>Acceso local</strong>
                <p class='metric-copy'>Los alumnos siguen entrando con nombre, apellido y grupo desde esta app.</p>
              </div>
              <div class='summary-card'>
                <p class='mini-label'>Maestros</p>
                <strong class='summary-number'>Modulo SASE</strong>
                <p class='metric-copy'>SASE debe redirigir a la feria con un token firmado para habilitar el panel docente.</p>
              </div>
            </div>
            <div class='hero-actions'>
              <a class='button button--secondary' href='#/login'>Volver al acceso de alumnos</a>
            </div>
          </article>
        </section>
      </main>
    </div>
  `;
}

function handleSyncError(error) {
  console.error(error);
  showToast('No se pudo sincronizar con el backend local.');
}

function renderLegendItem(status, label) {
  return `
    <span class='legend-item'>
      <span class='legend-dot ${'status-pill--' + status}'></span>
      ${escapeHtml(label)}
    </span>
  `;
}

function renderStandCard(stand, visitor, recommendedId) {
  const isCurrent = visitor.currentStandId === stand.id;
  const isRecommended = recommendedId === stand.id;
  const wasVisited = visitor.visitedStandIds.includes(stand.id);

  return `
    <article class='stand-card${isCurrent ? ' is-current' : ''}${isRecommended ? ' is-recommended' : ''}' style='--accent: ${stand.accent}; --accent-soft: ${stand.accentSoft};'>
      <div class='stand-header'>
        <div>
          <span class='tag'>${formatStandLabel(stand.id)}</span>
          <h3>${escapeHtml(stand.name)}</h3>
        </div>
        <span class='material-symbols-outlined stand-icon'>${stand.icon}</span>
      </div>
      <p class='stand-copy'>${escapeHtml(stand.zone)} · ${escapeHtml(stand.label)} · ${wasVisited ? 'Visitado' : 'Pendiente'}</p>
      <div class='stand-stats'>
        <div class='stand-stat'>
          <span class='mini-label'>Aforo</span>
          <strong class='stand-number'>${stand.occupancy}</strong>
        </div>
        <div class='stand-stat'>
          <span class='mini-label'>Estado</span>
          <span class='status-pill status-pill--${stand.status}'>${getStatusLabel(stand.status)}</span>
        </div>
      </div>
      <div class='stand-actions'>
        <a class='button button--ghost' href='#/alumno/stand/${stand.id}'>Ver</a>
        <button class='button button--secondary' data-action='check-in' data-stand-id='${stand.id}'>QR</button>
      </div>
    </article>
  `;
}

function renderMatrixTile(stand) {
  return `
    <article class='matrix-tile' style='--accent: ${stand.accent}; --accent-soft: ${stand.accentSoft};'>
      <div class='matrix-top'>
        <span class='tag'>${formatStandLabel(stand.id)}</span>
        <span class='status-pill status-pill--${stand.status}'>${getStatusLabel(stand.status)}</span>
      </div>
      <h3 class='matrix-name'>${escapeHtml(stand.name)}</h3>
      <strong class='matrix-value'>${stand.occupancy}</strong>
      <div class='mini-progress'><span style='width: ${stand.loadPercent}%'></span></div>
      <p class='metric-copy'>${escapeHtml(stand.zone)} · meta ${stand.targetCapacity}</p>
    </article>
  `;
}

function renderBalanceRow(stand, mode) {
  return `
    <div class='list-item${mode === 'hot' ? ' is-active' : ''}'>
      <div class='row-main'>
        <div class='rank-circle'>${formatStandNumber(stand.id)}</div>
        <div class='row-text'>
          <span class='rank-name'>${escapeHtml(stand.name)}</span>
          <span class='row-subtitle'>${escapeHtml(stand.zone)} · meta ${stand.targetCapacity}</span>
        </div>
      </div>
      <div class='row-score'>
        <strong>${stand.occupancy}</strong>
      </div>
    </div>
  `;
}

function renderRankingRow(entry, activeVisitorId) {
  const active = activeVisitorId && entry.visitor.id === activeVisitorId;

  return `
    <div class='ranking-row${active ? ' is-active' : ''}'>
      <div class='row-main'>
        <div class='rank-circle'>${entry.rank}</div>
        <div class='row-text'>
          <span class='rank-name'>${escapeHtml(entry.visitor.name)}</span>
          <span class='row-subtitle'>${escapeHtml(entry.visitor.group)} · ${entry.completion} stands visitados</span>
        </div>
      </div>
      <div class='row-score'>
        <strong>${entry.score}</strong>
      </div>
    </div>
  `;
}

function renderStatPill(label, value) {
  return `
    <div class='stat-pill'>
      <span class='mini-label'>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderQuizOption(option, index, standId, quiz, attempt) {
  const isCorrect = attempt && index === quiz.correctIndex;
  const isSelectedWrong = attempt && attempt.selectedIndex === index && !attempt.correct;
  const disabled = Boolean(attempt);

  return `
    <button class='option-button${isCorrect ? ' is-correct' : ''}${isSelectedWrong ? ' is-selected-wrong' : ''}' ${disabled ? 'disabled' : ''} data-action='answer-quiz' data-stand-id='${standId}' data-option-index='${index}'>
      <span>${escapeHtml(option)}</span>
      <span class='material-symbols-outlined'>${isCorrect ? 'check_circle' : isSelectedWrong ? 'cancel' : 'radio_button_unchecked'}</span>
    </button>
  `;
}

function renderToast() {
  if (!ui.toast) {
    return '';
  }

  return `<div class='toast'>${escapeHtml(ui.toast)}</div>`;
}

function showToast(message) {
  ui.toast = message;

  if (ui.toastTimer) {
    window.clearTimeout(ui.toastTimer);
  }

  ui.toastTimer = window.setTimeout(() => {
    ui.toast = '';
    renderApp();
  }, 2400);

  renderApp();
}

function getStatusLabel(status) {
  if (status === 'low') return 'Baja';
  if (status === 'warm') return 'Subiendo';
  if (status === 'hot') return 'Saturado';
  return 'Equilibrado';
}

function formatStandLabel(id) {
  return 'Stand ' + formatStandNumber(id);
}

function formatStandNumber(id) {
  return String(id).padStart(2, '0');
}

function formatTimeAgo(timestamp) {
  const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 1) return 'justo ahora';
  if (minutes < 60) return 'hace ' + minutes + ' min';
  const hours = Math.floor(minutes / 60);
  return 'hace ' + hours + ' h';
}

function getMovementLabel(reason) {
  if (reason === 'scan') return 'QR';
  if (reason === 'rebalancing') return 'Desvio';
  if (reason === 'quiz') return 'Trivia';
  if (reason === 'refresh') return 'Refresh';
  return 'Auto';
}

function getMovementShortLabel(reason) {
  if (reason === 'rebalancing') return 'RD';
  if (reason === 'simulation') return 'AU';
  if (reason === 'quiz') return 'QV';
  if (reason === 'refresh') return 'RF';
  return 'QR';
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function cleanText(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return String(value || '')
    .split('&').join('&amp;')
    .split('<').join('&lt;')
    .split('>').join('&gt;')
    .split("'").join('&#39;');
}
