import React, { useEffect } from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onSumbit?: (value: string) => void;
}

interface IGroupProps extends IProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
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

export const InputGroup = React.forwardRef<HTMLInputElement, IGroupProps>(
  ({ className, left, right, onSumbit, ...props }: IGroupProps, ref: any) => {
    const handleSubmit = () => {
      onSumbit && onSumbit(ref.current.value);
    };

    const handleReturn = (event: KeyboardEvent) => {
      if (event.key !== 'Enter'){
        return;
      }
      handleSubmit();
    };

    useEffect(() => {
      if (ref && ref.current) {
        ref.current.addEventListener('keydown', handleReturn);
      }
      return () => {
        if (ref && ref.current) {
          ref.current.removeEventListener('keydown', handleReturn);
        }
      };
    }, []);

    return (
      <Main className={className}>
        {left}
        <InputInGroup ref={ref} {...props}/>
        <div onClick={handleSubmit}>{right}</div>
      </Main>
    );
  }
);

InputGroup.displayName = 'InputGroup';
