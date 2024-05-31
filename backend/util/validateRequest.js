const { RequestError } = require('./requestErrorHandler');

const validateLogin = (req) => {
  if (!req.session.user) throw new RequestError('로그아웃 상태입니다', 404);
};

const validateIDAndPassword = (id, password) => {
  const canLogin = TEST_ID === id && TEST_PASSWORD === password;
  if (!canLogin) {
    throw new RequestError('아이디 또는 비밀번호가 일치하지 않습니다', 401);
  }
};

const validateToken = (req, token = false) => {
  if (token) {
    if (req.session.token === token) return true;

    throw new RequestError('토큰이 존재하지 않습니다.', 403);
  }

  return true;
};

const validateReferer = (req, isUsingReferer = false) => {
  const referer = req.header('Referer');

  if (isUsingReferer) {
    if (referer === SAFE_REFERER) return true;

    throw new RequestError('리퍼러 헤더가 정상적이지 않습니다.', 403);
  }

  return true;
};

const validateRequest = (req) => {
  validateToken(req, req.query.token);
  validateReferer(req, req.session.isUsingReferer);
};

module.exports = {
  validateReferer,
  validateToken,
  validateLogin,
  validateRequest,
  validateIDAndPassword,
};
