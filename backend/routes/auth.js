var express = require('express');
var router = express.Router();
const { TEST_PASSWORD } = require('../testData');
const { requestErrorHandler } = require('../util/requestErrorHandler');
const {
  validateRequest,
  validateLogin,
  validateIDAndPassword,
} = require('../util/validateRequest');

router.get('/check', (req, res) => {
  requestErrorHandler(() => {
    validateLogin(req);
    return res.status(200).json({});
  }, res);
});

router.post('/password', (req, res) => {
  requestErrorHandler(() => {
    validateRequest(req);

    TEST_PASSWORD.data = '4321';
    return res.status(201).json({});
  }, res);
});

router.post('/login', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ message: '이미 로그인되어 있습니다.' });
  }

  let { id, password } = req.body;

  //csrf 테스트를 위한 코드
  console.log(req.body);

  if (typeof req.body === 'string') {
    const data = JSON.parse(req.body);
    id = data.id;
    password = data.password;
  }

  requestErrorHandler(() => {
    validateIDAndPassword(id, password);

    req.session.user = id;
    res.status(200).json({});
  }, res);
});

router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy(() =>
      res.status(200).json({ message: '로그아웃이 정상적으로 완료되었습니다.' })
    );

    return;
  }

  res.status(200).json({ message: '로그인 상태가 아닙니다' });
});

module.exports = router;
