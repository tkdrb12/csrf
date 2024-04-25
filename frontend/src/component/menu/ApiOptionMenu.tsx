import { useContext } from 'react';
import {
  ApiOptionContext,
  ApiOptionDisPatchContext,
} from '../../context/ApiOption';
import ToggleList from '../common/Toggle/ToggleList';
import styled from 'styled-components';

const ApiOptionMenu = () => {
  const { noCheckReferer, checkReferer, noUseCSRFToken, useCSRFToken } =
    useContext(ApiOptionDisPatchContext);

  const { isCheckingReferer, hasCSRFToken } = useContext(ApiOptionContext);

  const options = [
    {
      name: 'referer 체크',
      value: isCheckingReferer,
      handler: {
        handleToggleOn: checkReferer,
        handleToggleOff: noCheckReferer,
      },
    },
    {
      name: 'csrf 토큰 체크',
      value: hasCSRFToken,
      handler: {
        handleToggleOn: useCSRFToken,
        handleToggleOff: noUseCSRFToken,
      },
    },
  ];

  return (
    <Menu>
      <ToggleList options={options}></ToggleList>
    </Menu>
  );
};

export default ApiOptionMenu;

const Menu = styled.div``;
