import { createContext } from 'react';

type LoginDispatch = { login: () => void; logout: () => void };

export const LoginContext = createContext(false);

export const LoginDisPatchContext = createContext<LoginDispatch>({
  login: () => {},
  logout: () => {},
});
