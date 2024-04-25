import styled from 'styled-components';
import { useCustomNavigate } from '../router';
import { useContext } from 'react';
import { LoginContext } from '../context/Login';

const postList = [
  {
    id: 1,
    title: 'xss 테스트용 게시물입니다.',
    contents: 'aasdf',
    date: '24/04/21',
  },
  {
    id: 2,
    title: 'mock data 게시물입니다.',
    contents: '테스트',
    date: '24/04/21',
  },
  {
    id: 3,
    title: 'mock data 게시물입니다.',
    date: '24/04/21',
    contents:
      '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트',
  },
];

const Main = () => {
  const { goToLoginPage, goToPostingPage } = useCustomNavigate();
  const isLogin = useContext(LoginContext);

  const handleClickPosting = (id: number) => {
    if (!isLogin) return goToLoginPage();

    goToPostingPage(id);
  };

  const handleClickLoginButton = () => {
    goToLoginPage();
  };

  return (
    <MainContainer>
      {!isLogin && (
        <LoginMessage onClick={handleClickLoginButton}>
          포스팅을 확인하시려면 로그인해주세요.
        </LoginMessage>
      )}
      {postList.map((item) => (
        <PostItem key={item.id} onClick={() => handleClickPosting(item.id)}>
          <PostContainer>
            <PostTitle>{item.title}</PostTitle>
            <PostContents>{item.contents}</PostContents>
          </PostContainer>
        </PostItem>
      ))}
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 300px;
  margin: 50px auto;
`;

const PostItem = styled.button``;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;

  height: 60px;
  margin: 0 4vw;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;

  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    transition: all ease-in 0.1s;

    box-shadow: rgba(0, 0, 0, 0.25) 1px 7px 15px;
  }
`;

const PostTitle = styled.div`
  font-size: 14px;
`;

const PostContents = styled.div`
  display: -webkit-box;

  font-size: 12px;
  color: gray;

  white-space: normal;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

const LoginMessage = styled.button`
  height: 38px;
  margin-top: 5px;
  margin-bottom: 30px;
  border-radius: 3px;

  background-color: transparent;

  text-align: center;
  font-size: 14px;
`;
