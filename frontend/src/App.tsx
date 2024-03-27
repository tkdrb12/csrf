import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LoginContext, LoginDisPatchContext } from './context/Login';
import { useState, useMemo } from 'react';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
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
