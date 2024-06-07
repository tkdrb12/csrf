var express = require('express');
const { validateRequest, validateLogin } = require('../util/validateRequest');
const { TEST_XSS_HTML_STR } = require('../testData');
const { requestErrorHandler } = require('../util/requestErrorHandler');

var router = express.Router();

router.get('/posting', (req, res) => {
  requestErrorHandler(() => {
    validateLogin(req);

    return res.status(200).json({
      title: 'xss 테스트용 게시물입니다.',
      html: TEST_XSS_HTML_STR,
    });
  }, res);
});

module.exports = router;
