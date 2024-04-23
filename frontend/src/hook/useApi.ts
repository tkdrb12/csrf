import { useContext } from 'react';
import { ApiOptionContext } from '../context/ApiOptions';

const useApi = () => {
  const { isCheckingReferer, hasCSRFToken } = useContext(ApiOptionContext);
};
