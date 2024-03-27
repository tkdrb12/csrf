import { createBrowserRouter, useNavigate } from 'react-router-dom';
import Root from './pages/Root';
import Main from './pages/Main';
import XSSPosting from './pages/XSSPosting';
import Login from './pages/Login';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  const goToPostingPage = (id: number) => {
    navigate(`/posting/${id}`);
  };

  return { goToLoginPage, goToMainPage, goToPostingPage };
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'posting/:id',
        element: <XSSPosting />,
      },
    ],
  },
]);
