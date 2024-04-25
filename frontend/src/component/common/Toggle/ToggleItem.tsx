import styled from 'styled-components';

export interface Option {
  name: string;
  value: boolean;
  handler: {
    handleToggleOn: () => void;
    handleToggleOff: () => void;
  };
}

interface ToggleItemProps {
  option: Option;
}

const ToggleItem = ({ option }: ToggleItemProps) => {
  const { handler, name, value } = option;

  const toggle = () => {
    if (value) return handler.handleToggleOff();
    handler.handleToggleOn();
  };

  return (
    <Box>
      <Name>{name}</Name>
      <Switch onClick={toggle} $isActive={value}>
        <Button $isActive={value} />
      </Switch>
    </Box>
  );
};

export default ToggleItem;

const Box = styled.button`
  display: flex;
  justify-content: space-between;

  min-width: 120px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;

  height: 35px;

  font-size: 15px;
  font-weight: 600;
  color: #0a0a0a;
`;

const Switch = styled.div<{ $isActive: boolean }>`
  display: block;
  position: relative;

  width: 70px;
  height: 35px;
  border-radius: 30px;
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);

  background-color: ${(props) => (props.$isActive ? '#00aaff' : '#fff')};

  transition: all 0.2s ease-in;
  cursor: pointer;
`;

const Button = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.$isActive ? 'calc(100% - 32px)' : '4px')};

  width: 28px;
  height: 28px;
  border-radius: 50%;

  background-color: ${(props) => (props.$isActive ? '#fff' : '#00aaff')};

  transform: translateY(-50%);
  transition: all 0.2s ease-in;
`;
