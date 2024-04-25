import styled from 'styled-components';
import ToggleItem, { Option } from './ToggleItem';
import { useState } from 'react';
import { OptionIcon } from '../../../asset/icon';

interface OptionsProps {
  options: Option[];
}

const ToggleList = ({ options }: OptionsProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseOver = () => {
    setIsActive(true);
  };

  const handleMouseOut = () => {
    setIsActive(false);
  };

  return (
    <Axis>
      <IconBox $isActive={isActive}>
        <OptionIcon />
      </IconBox>
      <Container
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        $isActive={isActive}
      >
        {isActive &&
          options.map((option) => (
            <ToggleItem key={option.name} option={option}></ToggleItem>
          ))}
      </Container>
    </Axis>
  );
};

export default ToggleList;

const Axis = styled.div`
  position: relative;
`;

const IconBox = styled.div<{ $isActive: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  pointer-events: none;
  transition: all 0.2s ease-in;
  transform-origin: left bottom;

  color: ${({ $isActive }) => ($isActive ? 'transparent' : 'gray')};
`;

const Container = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 25px;

  width: ${({ $isActive }) => ($isActive ? '300px' : '50px')};
  height: ${({ $isActive }) => ($isActive ? '350px' : '50px')};
  border-radius: ${({ $isActive }) => ($isActive ? '10px' : '20px')};
  padding: ${({ $isActive }) => ($isActive ? '32px' : '0')};
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);

  background-color: white;

  transition: all 0.2s ease-in;
  transform-origin: right bottom;

  overflow: hidden;
`;
