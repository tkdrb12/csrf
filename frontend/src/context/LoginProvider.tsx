import {
  useState,
  useMemo,
  useEffect,
  PropsWithChildren,
  useContext,
} from 'react';
import { validateLogin } from '../api';
import { LoginContext, LoginDisPatchContext } from './Login';
import { ApiOptionDisPatchContext } from './ApiOption';

const LoginProvider = ({ children }: PropsWithChildren) => {
  const { noCheckReferer, noUseCSRFToken } = useContext(
    ApiOptionDisPatchContext
  );
  const [isLogin, setIsLogin] = useState(false);

  const tryValidateLogin = async () => {
    try {
      await validateLogin();
      setIsLogin(true);
    } catch (err) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    tryValidateLogin();
  }, []);

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    noCheckReferer();
    noUseCSRFToken();
  };

  const loginDispatch = useMemo(() => ({ login, logout }), []);

  return (
    <LoginContext.Provider value={isLogin}>
      <LoginDisPatchContext.Provider value={loginDispatch}>
        {children}
      </LoginDisPatchContext.Provider>
    </LoginContext.Provider>
  );
};

export default LoginProvider;
