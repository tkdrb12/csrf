const { TEST_ID, TEST_PASSWORD, SAFE_REFERER } = require('../testData');
const { RequestError } = require('./requestErrorHandler');

const validateLogin = (req) => {
  if (!req.session.user) throw new RequestError('로그아웃 상태입니다', 404);
};

const validateIDAndPassword = (id, password) => {
  const canLogin = TEST_ID === id && TEST_PASSWORD.data === password;
  if (!canLogin) {
    throw new RequestError('아이디 또는 비밀번호가 일치하지 않습니다', 401);
  }
};

const validateToken = (req, token = false) => {
  if (req.session.token) {
    if (req.session.token === token) return true;

    throw new RequestError('토큰이 존재하지 않습니다.', 403);
  }
};

const validateReferer = (req, isUsingReferer = false) => {
  if (isUsingReferer) {
    try {
      const referer = req.header('Referer');

      if (referer !== SAFE_REFERER)
        throw new RequestError('허용되지 않은 리퍼러 헤더입니다.', 403);
    } catch (err) {
      throw new RequestError('리퍼러 헤더가 정상적이지 않습니다.', 403);
    }
  }
};

const validateRequest = (req, token) => {
  validateToken(req, token);
  validateReferer(req, req.session.isUsingReferer);
};

module.exports = {
  validateReferer,
  validateToken,
  validateLogin,
  validateRequest,
  validateIDAndPassword,
};
