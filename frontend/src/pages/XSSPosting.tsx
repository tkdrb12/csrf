const XSSPosting = () => {
  const testingXssString = `<img src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" onLoad="alert('XSS 공격!')">`;

  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: testingXssString }}></div>
      안녕하세요. xss 게시물입니다
    </div>
  );
};

export default XSSPosting;
