import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LoginContext, LoginDisPatchContext } from './context/Login';
import { useState, useMemo, useEffect } from 'react';
import { validateLogin } from './api';

const App = () => {
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
    // setIsLogin(true);
  };

  const loginDispatch = useMemo(() => ({ login, logout }), []);

  return (
    <div className="App">
      <LoginContext.Provider value={isLogin}>
        <LoginDisPatchContext.Provider value={loginDispatch}>
          <RouterProvider router={router} />
        </LoginDisPatchContext.Provider>
      </LoginContext.Provider>
    </div>
  );
};

export default App;
