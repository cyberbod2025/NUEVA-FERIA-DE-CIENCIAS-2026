const crypto = require('node:crypto');

const feriaAppUrl = process.env.FERIA_APP_URL || 'http://localhost:3000/#/docente';
const sharedSecret = process.env.SASE_SHARED_SECRET || '';
const teacherEmail = process.env.SMOKE_TEACHER_EMAIL || 'docente@sase.mx';
const teacherName = process.env.SMOKE_TEACHER_NAME || 'Docente Piloto';
const teacherId = process.env.SMOKE_TEACHER_ID || 'teacher-sase-001';
const institutionId = process.env.SMOKE_INSTITUTION_ID || '09DES4310M';
const groupId = process.env.SMOKE_GROUP_ID || '2A';

if (!sharedSecret) {
  console.error('Missing SASE_SHARED_SECRET.');
  process.exit(1);
}

const now = Math.floor(Date.now() / 1000);
const validPayload = {
  sub: teacherId,
  uid: teacherId,
  email: teacherEmail,
  role: 'teacher',
  name: teacherName,
  module: 'feria',
  institutionId,
  groupId,
  iat: now,
  exp: now + 300
};

const invalidPayload = {
  ...validPayload,
  exp: now - 10
};

async function main() {
  const target = new URL(feriaAppUrl);
  const apiUrl = new URL('/api/session/teacher/sase', target.origin);
  const launchUrl = buildLaunchUrl(feriaAppUrl, signPayload(validPayload));

  console.log('Feria origin:', target.origin);
  console.log('Teacher launch URL:', launchUrl);

  await assertExchange(apiUrl, signPayload(validPayload), true);
  await assertExchange(apiUrl, signPayload(invalidPayload), false);

  console.log('Smoke OK: Feria accepted a valid SASE token and rejected an expired one.');
}

function signPayload(payload) {
  const payloadPart = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signaturePart = crypto.createHmac('sha256', sharedSecret).update(payloadPart).digest('base64url');
  return payloadPart + '.' + signaturePart;
}

function buildLaunchUrl(baseUrl, token) {
  const url = new URL(baseUrl);
  const hash = url.hash;
  url.hash = '';
  url.searchParams.set('sase_token', token);
  return url.toString() + hash;
}

async function assertExchange(apiUrl, token, shouldSucceed) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token })
  });

  const payload = await response.json().catch(() => null);

  if (shouldSucceed) {
    if (!response.ok) {
      throw new Error('Expected successful teacher exchange, got ' + response.status + ' ' + JSON.stringify(payload));
    }

    if (payload?.role !== 'teacher' || payload?.provider !== 'sase') {
      throw new Error('Unexpected teacher session payload: ' + JSON.stringify(payload));
    }

    return;
  }

  if (response.ok) {
    throw new Error('Expected failure for invalid token, but exchange succeeded: ' + JSON.stringify(payload));
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
