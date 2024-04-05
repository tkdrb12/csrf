import { useEffect, useState } from 'react';
import { getPosting } from '../api';

const XSSPosting = () => {
  const [postHtml, setPostHtml] = useState('');

  const tryGetPosting = async () => {
    try {
      const post = await getPosting();
      setPostHtml(post?.html);
    } catch (err) {}
  };

  useEffect(() => {
    tryGetPosting();
  }, []);

  return (
    <div className="App">
      <img src="" alt=""/>
      <div dangerouslySetInnerHTML={{ __html: postHtml }}></div>
      안녕하세요. xss 게시물입니다 <br />
      해당 이미지에 삽입된 스크립트 {postHtml}
    </div>
  );
};

export default XSSPosting;
