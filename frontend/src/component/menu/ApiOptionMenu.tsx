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
      name: 'Referer 검사',
      value: isCheckingReferer,
      handler: {
        handleToggleOn: checkReferer,
        handleToggleOff: noCheckReferer,
      },
    },
    {
      name: 'Token 검사',
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
