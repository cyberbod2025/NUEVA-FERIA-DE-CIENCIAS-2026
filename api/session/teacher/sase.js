const { registerTeacherSessionFromSase, readJsonBody, sendJson } = require('../../../server');

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return sendJson(res, 405, { error: 'method_not_allowed' });
    }

    const body = await readJsonBody(req);
    const sessionData = await registerTeacherSessionFromSase(body);
    return sendJson(res, 200, sessionData);
  } catch (error) {
    return sendJson(res, error.statusCode || 401, {
      error: 'invalid_teacher_session',
      message: error.message,
    });
  }
};
