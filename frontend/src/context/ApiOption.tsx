import { createContext } from 'react';

type ApiOptionType = { hasCSRFToken: boolean; isCheckingReferer: boolean };

type ApiOptionDispatchContext = {
  noCheckReferer: () => void;
  checkReferer: () => void;
  noUseCSRFToken: () => void;
  useCSRFToken: () => void;
};

export const ApiOptionContext = createContext<ApiOptionType>({
  hasCSRFToken: false,
  isCheckingReferer: false,
});

export const ApiOptionDisPatchContext = createContext<ApiOptionDispatchContext>(
  {
    noCheckReferer: () => {},
    checkReferer: () => {},
    noUseCSRFToken: () => {},
    useCSRFToken: () => {},
  }
);
