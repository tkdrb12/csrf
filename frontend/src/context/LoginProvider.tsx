import { useState, useMemo, useEffect, PropsWithChildren } from 'react';
import { validateLogin } from '../api';
import { LoginContext, LoginDisPatchContext } from './Login';

const LoginProvider = ({ children }: PropsWithChildren) => {
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
