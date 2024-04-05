import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import { useCustomNavigate } from '../router';
import { LoginDisPatchContext } from '../context/Login';
import { loginSession } from '../api';

const MAX_PASSWORD_LENGTH = 15;
const MAX_ID_LENGTH = 15;

interface LoginProps {
  message?: string;
}

const Login = (props: LoginProps) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const { login } = useContext(LoginDisPatchContext);

  const { goToMainPage } = useCustomNavigate();

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginError = () => {
    setIsError(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    tryLogin();
  };

  const tryLogin = async () => {
    try {
      await loginSession(id, password);

      login();
      goToMainPage();
    } catch (err) {
      handleLoginError();
    }
  };

  return (
    <LoginBox>
      {props.message}
      <LoginForm onSubmit={handleSubmit}>
        <Input
          maxLength={MAX_ID_LENGTH}
          onChange={handleChangeId}
          placeholder="아이디를 입력해주세요"
        />
        <Input
          type="password"
          maxLength={MAX_PASSWORD_LENGTH}
          onChange={handleChangePassword}
          placeholder="비밀번호를 입력해주세요"
        />
        <SubmitButton>로그인</SubmitButton>
        {isError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
      </LoginForm>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.div`
  width: 400px;
  height: 300px;
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 7px;

  width: fit-content;
  margin: 0 auto;
  padding: 70px 0;
`;

const Input = styled.input`
  height: 36px;
  width: 300px;
  border: 1px solid gray;
  text-indent: 10px;
  &:focus {
    outline: 1px solid #00aaff;
  }
`;

const SubmitButton = styled.button`
  height: 38px;
  width: 300px;
  margin-top: 5px;
  border-radius: 3px;

  background-color: #00aaff;

  font-size: 14px;
  color: white;
`;

const ErrorMessage = styled.p`
  width: 300px;
  margin: 5px 0;

  font-size: 12px;
  color: red;
`;
