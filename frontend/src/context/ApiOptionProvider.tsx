import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { ApiOptionContext, ApiOptionDisPatchContext } from './ApiOption';
import {
  checkRefererOption,
  checkTokenOption,
  turnOffRefererOption,
  turnOffTokenOption,
  turnOnRefererOption,
  turnOnTokenOption,
} from '../api';

const ApiOptionProvider = ({ children }: PropsWithChildren) => {
  const [hasCSRFToken, setHasCSRFToken] = useState(false);
  const [isCheckingReferer, setIsCheckingReferer] = useState(false);

  const tryCheckTokenOption = async () => {
    try {
      const { token, isUsingToken } = await checkTokenOption();

      if (!!token) localStorage.setItem('CSRF-TOKEN', token);

      setHasCSRFToken(isUsingToken);
    } catch (err) {
      localStorage.removeItem('CSRF-TOKEN');
    }
  };

  const tryCheckRefererOption = async () => {
    try {
      const { isUsingReferer } = await checkRefererOption();

      setIsCheckingReferer(isUsingReferer);
    } catch (err) {}
  };

  useEffect(() => {
    tryCheckTokenOption();
    tryCheckRefererOption();
  }, []);

  const noCheckReferer = () => {
    turnOffRefererOption().then(() => {
      setIsCheckingReferer(false);
    });
  };

  const checkReferer = () => {
    turnOnRefererOption().then(() => {
      setIsCheckingReferer(true);
    });
  };

  const noUseCSRFToken = () => {
    turnOffTokenOption().then(() => {
      setHasCSRFToken(false);

      localStorage.removeItem('CSRF-TOKEN');
    });
  };

  const useCSRFToken = () => {
    turnOnTokenOption().then(({ token }) => {
      setHasCSRFToken(true);

      localStorage.setItem('CSRF-TOKEN', token);
    });
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
