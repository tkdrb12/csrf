import { PropsWithChildren, useMemo, useState } from 'react';
import { ApiOptionContext, ApiOptionDisPatchContext } from './ApiOption';

const ApiOptionProvider = ({ children }: PropsWithChildren) => {
  const [hasCSRFToken, setHasCSRFToken] = useState(false);
  const [isCheckingReferer, setIsCheckingReferer] = useState(false);

  const noCheckReferer = () => {
    setIsCheckingReferer(false);
  };

  const checkReferer = () => {
    setIsCheckingReferer(true);
  };

  const noUseCSRFToken = () => {
    setHasCSRFToken(false);
  };

  const useCSRFToken = () => {
    setHasCSRFToken(true);
  };

  const apiOptionDispatch = useMemo(
    () => ({ noCheckReferer, checkReferer, useCSRFToken, noUseCSRFToken }),
    []
  );

  const apiOption = useMemo(() => {
    return { hasCSRFToken, isCheckingReferer };
  }, [hasCSRFToken, isCheckingReferer]);

  return (
    <ApiOptionContext.Provider value={apiOption}>
      <ApiOptionDisPatchContext.Provider value={apiOptionDispatch}>
        {children}
      </ApiOptionDisPatchContext.Provider>
    </ApiOptionContext.Provider>
  );
};

export default ApiOptionProvider;
