import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  return (
    <div>
      <Header></Header>
      <Outlet />
    </div>
  );
};

export default Root;

const Header = styled.header``;
