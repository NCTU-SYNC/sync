import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  placeholder?: string;
  value?: string;
}

interface IGroupProps {
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
  margin: 0;
  border: none;
  outline: none;
`;

const InputInGroup = styled.input`
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

export const Input = (props: IProps) => (
  <StyledInput {...props}/>
);

export const InputGroup = ({ className, left, right, ...props }: IGroupProps) => {
  return (
    <Main className={className}>
      {left}
      <InputInGroup {...props}/>
      {right}
    </Main>
  );
};
