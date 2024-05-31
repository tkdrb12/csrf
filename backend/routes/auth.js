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

    TEST_PASSWORD = '4321';
    return res.status(201).json({});
  }, res);
});

router.post('/login', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ message: '이미 로그인되어 있습니다.' });
  }

  const { id, password } = req.body;

  requestErrorHandler(() => {
    validateIDAndPassword(id, password);

    req.session.user = id;
    return res.status(200).json({});
  }, res);
});

router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.redirect('/login');

    return;
  }

  res.status(200).json({ message: '로그인 상태가 아닙니다' });
});

module.exports = router;
