var express = require('express');
const { validateToken, validateReferer } = require('../util/validateRequest');
const { makeToken } = require('../util/token');
var router = express.Router();

let TEST_ID = '1234';
let TEST_PASSWORD = '1234';

router.get('/referer-check', (req, res) => {
  const isUsingReferer = !!req.session.isUsingReferer;

  return res.status(200).json({ isUsingReferer });
});

router.post('/referer-check-on', (req, res) => {
  req.session.isUsingReferer = true;

  return res.status(200).json({ isUsingReferer: true });
});

router.post('/referer-check-off', (req, res) => {
  req.session.isUsingReferer = false;

  return res.status(200).json({ isUsingReferer: false });
});

router.get('/token-check', (req, res) => {
  const token = req.session.token;

  return res.status(200).json({ isUsingToken: !!token, token });
});

router.post('/token-check-on', (req, res) => {
  const token = makeToken();

  req.session.token = token;

  return res.status(200).json({ isUsingToken: true, token });
});

router.post('/token-check-off', (req, res) => {
  req.session.token = undefined;

  return res.status(200).json({ isUsingToken: false });
});

router.get('/test', (req, res) => {
  const { user } = req.session;

  if (user) {
    return res.status(200).json({});
  } else {
    res.status(404).json({});
  }
});

router.post('/password', (req, res) => {
  const { user } = req.session;
  const { token } = req.query;

  if (!validateToken(req, token) || !validateReferer(req)) {
    return res.status(403).json({ title: 'not validate' });
  }

  if (user) {
    TEST_PASSWORD = '4321';
    return res.status(201).json({});
  }

  res.status(404).render('index', { title: 'not login' });
});

router.get('/posting', (req, res) => {
  const { user } = req.session;
  const { token } = req.query;

  if (!validateToken(req, token) || !validateReferer(req)) {
    return res.status(403).json({ title: 'not validate' });
  }

  if (!user) {
    return res.status(404).render('index', { title: 'not login' });
  }

  return res.status(200).json({
    title: 'xss 테스트용 게시물입니다.',
    html: `<img src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" onLoad="fetch('http://localhost:3001/user/password', {method: 'POST', credentials:'include'})"> <div>해당 이미지 태그에 비밀번호 변경 요청이 포함되어 있습니다</div>`,
  });
});

router.post('/login', (req, res) => {
  const { id, password } = req.body;

  if (req.session.user) {
    return res.status(200).json({ message: '이미 로그인되어 있습니다.' });
  }

  const canLogin = TEST_ID === id && TEST_PASSWORD === password;
  if (canLogin) {
    req.session.user = id;

    res.status(200).json({});
  } else {
    res.status(401).json({
      message: '아이디 또는 비밀번호가 일치하지 않습니다.',
    });
  }
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
