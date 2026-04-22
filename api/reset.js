const { createInitialState, writeState, sendJson } = require('../server');

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return sendJson(res, 405, { error: 'method_not_allowed' });
    }

    const state = await createInitialState();
    await writeState(state);
    return sendJson(res, 200, state);
  } catch (error) {
    return sendJson(res, error.statusCode || 500, {
      error: 'reset_error',
      message: error.message,
    });
  }
};
