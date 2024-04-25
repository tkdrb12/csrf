import { useEffect, useState } from 'react';
import { getPosting } from '../api';
import styled from 'styled-components';
import { useCustomNavigate } from '../router';

const XSSPosting = () => {
  const { goToMainPage } = useCustomNavigate();

  const [postHtml, setPostHtml] = useState('');
  const [title, setTitle] = useState('');

  const tryGetPosting = async () => {
    try {
      const post = await getPosting();

      setTitle(post.title);
      setPostHtml(post?.html);
    } catch (err) {
      console.log(err);
      goToMainPage();
    }
  };

  useEffect(() => {
    tryGetPosting();
  }, []);

  return (
    <Container>
      <Title>{title}</Title>
      <div
        dangerouslySetInnerHTML={{
          __html: postHtml,
        }}
      ></div>
    </Container>
  );
};

export default XSSPosting;

const Container = styled.div`
  padding: 30px;

  * {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  img {
    border-radius: 20px;
    max-width: 400px;
    min-height: 300px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;

  height: 50px;
  padding: 10px;

  font-size: 20px;
  font-weight: 700;
`;
