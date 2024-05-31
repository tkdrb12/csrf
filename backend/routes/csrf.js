var express = require('express');
var router = express.Router();

const { makeToken } = require('../util/token');

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

module.exports = router;
