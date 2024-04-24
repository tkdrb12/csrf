import styled from 'styled-components';

export interface Option {
  name: string;
  value: string;
  handler: {
    handleChange: () => void;
  };
}

interface ToggleItemProps {
  option: Option;
}

const ToggleItem = ({ option }: ToggleItemProps) => {
  const { handler, name } = option;

  return <Box onClick={handler.handleChange}>{name}</Box>;
};

export default ToggleItem;

const Box = styled.button``;
