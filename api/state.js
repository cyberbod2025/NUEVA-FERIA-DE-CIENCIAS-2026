const {
  loadState,
  loadCatalog,
  normalizeIncomingState,
  writeState,
  readJsonBody,
  sendJson,
} = require('../server');

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const state = await loadState({ writeIfAdvanced: true });
      return sendJson(res, 200, state);
    }

    if (req.method === 'PUT') {
      const stands = await loadCatalog();
      const body = await readJsonBody(req);
      const nextState = normalizeIncomingState(body, stands);
      await writeState(nextState);
      return sendJson(res, 200, nextState);
    }

    return sendJson(res, 405, { error: 'method_not_allowed' });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, {
      error: 'state_error',
      message: error.message,
    });
  }
};
