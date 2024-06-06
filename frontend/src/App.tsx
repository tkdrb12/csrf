import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ApiOptionProvider from './context/ApiOptionProvider';
import LoginProvider from './context/LoginProvider';

const App = () => {
  return (
    <div className="App">
      <ApiOptionProvider>
        <LoginProvider>
          <RouterProvider router={router} />
        </LoginProvider>
      </ApiOptionProvider>
    </div>
  );
};

export default App;
