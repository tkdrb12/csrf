import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ApiOptionMenu from '../component/menu/ApiOptionMenu';
import { LoginContext, LoginDisPatchContext } from '../context/Login';
import { useCustomNavigate } from '../router';

const Root = () => {
  const isLogin = useContext(LoginContext);
  const { logout } = useContext(LoginDisPatchContext);

  const { goToMainPage, goToLoginPage } = useCustomNavigate();

  return (
    <div>
      <Header>
        <Logo onClick={goToMainPage}>TEST</Logo>
        {isLogin ? (
          <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        ) : (
          <LoginButton onClick={goToLoginPage}>로그인</LoginButton>
        )}
      </Header>
      <Nav>
        <ApiOptionMenu />
      </Nav>
      <Outlet />
    </div>
  );
};

export default Root;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  height: 80px;
  border: 1px solid lightgray;
`;

const Logo = styled.div`
  color: #00aaff;
  font-size: 28px;
  font-weight: 900;

  cursor: pointer;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #00aaff;

  background-color: white;

  color: #00aaff;
  font-size: 14px;
`;

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid white;

  background-color: #00aaff;

  color: white;
  font-size: 14px;
`;

const Nav = styled.nav`
  position: absolute;
  right: 10vw;
  bottom: 10vh;
`;
