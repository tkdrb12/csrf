import styled from 'styled-components';
import ToggleItem, { Option } from './ToggleItem';

interface OptionsProps {
  options: Option[];
}

const Options = ({ options }: OptionsProps) => {
  return (
    <Axis>
      <Container>
        {options.map((option) => (
          <ToggleItem option={option}></ToggleItem>
        ))}
      </Container>
    </Axis>
  );
};

export default Options;

const Axis = styled.div`
  position: absolute;
`;

const Container = styled.div``;
