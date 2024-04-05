var express = require('express');
var router = express.Router();

let TEST_ID = '1234';
let TEST_PASSWORD = '1234';

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

  if (user) {
    TEST_PASSWORD = '4321';
    return res.status(201).json({});
  }
  res.status(404).render('index', { title: 'not login' });
});

router.get('/posting', (req, res) => {
  const { user } = req.session;

  if (user) {
    return res.status(200).json({
      html: `<img src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" onLoad="fetch('http://localhost:3001/user/password', {method: 'POST', credentials:'include'})">`,
    });
  }
  res.status(404).render('index', { title: 'not login' });
});

router.post('/login', (req, res) => {
  const { id, password } = req.body;

  if (req.session.user) {
    return res.status(200).json({ message: '이미 로그인되어 있습니다.' });
  }

  const canLogin = TEST_ID === id && TEST_PASSWORD === password;
  if (canLogin) {
    req.session.user = id;
    res.redirect('http://localhost:3000');
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
