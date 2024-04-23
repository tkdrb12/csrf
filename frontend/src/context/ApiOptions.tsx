import { createContext } from 'react';

type ApiOptionType = { hasCSRFToken: boolean; isCheckingReferer: boolean };

export const ApiOptionContext = createContext<ApiOptionType>({
  hasCSRFToken: false,
  isCheckingReferer: false,
});
