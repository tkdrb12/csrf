var express = require('express');
var router = express.Router();

const { makeToken } = require('../util/token');
const { requestErrorHandler } = require('../util/requestErrorHandler');
const { validateLogin } = require('../util/validateRequest');

router.get('/referer-check', (req, res) => {
  const isUsingReferer = !!req.session.isUsingReferer;

  requestErrorHandler(() => {
    validateLogin(req);

    return res.status(200).json({ isUsingReferer });
  }, res);
});

router.post('/referer-check-on', (req, res) => {
  req.session.isUsingReferer = true;

  requestErrorHandler(() => {
    validateLogin(req);

    res.status(200).json({ isUsingReferer: true });
  }, res);
});

router.post('/referer-check-off', (req, res) => {
  req.session.isUsingReferer = false;

  requestErrorHandler(() => {
    validateLogin(req);

    return res.status(200).json({ isUsingReferer: false });
  }, res);
});

router.get('/token-check', (req, res) => {
  const token = req.session.token;

  requestErrorHandler(() => {
    validateLogin(req);

    return res.status(200).json({ isUsingToken: !!token, token });
  }, res);
});

router.post('/token-check-on', (req, res) => {
  const token = makeToken();

  req.session.token = token;

  requestErrorHandler(() => {
    validateLogin(req);

    return res.status(200).json({ isUsingToken: true, token });
  }, res);
});

router.post('/token-check-off', (req, res) => {
  req.session.token = undefined;

  requestErrorHandler(() => {
    validateLogin(req);

    return res.status(200).json({ isUsingToken: false });
  }, res);
});

module.exports = router;
