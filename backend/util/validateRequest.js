const SAFE_REFERER = 'http://localhost:3000/';

const validateToken = (req, token) => {
  if (req.session.token) {
    if (req.session.token === token) return true;

    return false;
  }

  return true;
};

const validateReferer = (req) => {
  const referer = req.header('Referer');

  if (req.session.isUsingReferer) {
    if (referer === SAFE_REFERER) return true;

    return false;
  }

  return true;
};

module.exports = { validateReferer, validateToken };
