import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ApiOptionMenu from '../component/menu/ApiOptionMenu';

const Root = () => {
  return (
    <div>
      <Header>
        <ApiOptionMenu />
      </Header>
      <Outlet />
    </div>
  );
};

export default Root;

const Header = styled.header`
  position: absolute;
  right: 10vw;
  bottom: 10vh;
`;
