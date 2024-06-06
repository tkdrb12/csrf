let TEST_ID = '1234';

let TEST_PASSWORD = { data: '1234' };

const TEST_XSS_HTML_STR = `<img src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" onLoad="fetch('http://localhost:3001/auth/password', {method: 'POST', credentials:'include'})"> <div>해당 이미지 태그에 비밀번호 변경 요청이 포함되어 있습니다</div>`;

const SAFE_REFERER = 'http://localhost:3000/';

module.exports = {
  TEST_ID,
  TEST_PASSWORD,
  TEST_XSS_HTML_STR,
  SAFE_REFERER,
};
