import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  placeholder?: string;
  value?: string;
}

const Main = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.textLight};
`;

const StyledInput = styled.input`
  flex: 1;
  margin: 0;
  border: none;
  outline: none;
  padding: 5px 15px;

  &::placeholder {
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.theme.textLightMedium};
  }
`;

const Input = ({ className, left, right, ...props }: IProps) => {
  return (
    <Main className={className}>
      {left}
      <StyledInput {...props}/>
      {right}
    </Main>
  );
};

export default Input;

