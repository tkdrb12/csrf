import styled from 'styled-components';
import { useCustomNavigate } from '../router';
import { useContext } from 'react';
import { LoginContext, LoginDisPatchContext } from '../context/Login';
import { logoutSession } from '../api';
import ApiOptionMenu from '../component/menu/ApiOptionMenu';

const Main = () => {
  const { goToLoginPage, goToPostingPage } = useCustomNavigate();
  const isLogin = useContext(LoginContext);
  const { logout } = useContext(LoginDisPatchContext);

  const handleClickPosting = (id: number) => {
    if (!isLogin) return goToLoginPage();

    goToPostingPage(id);
  };

  const handleClickLoginButton = () => {
    goToLoginPage();
  };

  const handleClickLogoutButton = () => {
    logoutSession();
    logout();
  };

  return (
    <MainContainer>
      {!isLogin ? (
        <LoginButton onClick={handleClickLoginButton}>
          포스팅을 확인하시려면 로그인해주세요.
        </LoginButton>
      ) : (
        <LoginButton onClick={handleClickLogoutButton}>로그아웃</LoginButton>
      )}
      <PostItem onClick={() => handleClickPosting(1)}>xss 게시물보기</PostItem>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 400px;
  height: 300px;
  margin: 50px auto;
`;

const PostItem = styled.button`
  height: 80px;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const LoginButton = styled.button`
  height: 38px;
  margin-top: 5px;
  border-radius: 3px;

  background-color: transparent;

  text-align: center;
  font-size: 14px;
`;
