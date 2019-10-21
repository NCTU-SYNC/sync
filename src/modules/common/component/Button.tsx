import React, { ReactNode } from 'react';
import { noop } from 'lodash';
import styled from 'styled-components';

import Variant from '~/constants/variant';

interface IProps {
  className?: string;
  size?: number;
  outline?: boolean;
  rounded?: boolean;
  variant?: Variant;
  children: ReactNode;
  onClick?: (evnet: any) => void;
  onMouseDown?: (event: any) => void;
}

const Main = styled.button<IProps>`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  outline: none;
  border: none;
  height: ${props => props.size}px;
  line-height: ${props => props.size}px;
  padding: 0 30px;
  color: ${props => props.variant === Variant.NONE ? props.theme.textLightMedium : props.theme.justWhite};
  background-color: ${props => props.theme[props.variant || Variant.PRIMARY]};
  ${props => props.outline && `
    border: 1px solid ${props.theme[props.variant || Variant.PRIMARY]};
    color: ${props.theme[props.variant || Variant.PRIMARY]};
    background-color: ${props.theme.justWhite};
  `}
`;

const Button = ({ children, onClick = noop, ...props }: IProps) => (
  <Main onClick={onClick} {...props}>
    {children}
  </Main>
);

export default Button;
