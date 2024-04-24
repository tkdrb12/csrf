import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ApiOptionProvider from './context/ApiOptionProvider';
import LoginProvider from './context/LoginProvider';

const App = () => {
  return (
    <div className="App">
      <LoginProvider>
        <ApiOptionProvider>
          <RouterProvider router={router} />
        </ApiOptionProvider>
      </LoginProvider>
    </div>
  );
};

export default App;
