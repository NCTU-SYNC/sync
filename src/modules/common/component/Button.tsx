import React, { ReactNode } from 'react';
import { noop } from 'lodash';
import styled from 'styled-components';

import Variant from '~/constants/variant';

interface IProps {
  size?: number;
  rounded?: boolean;
  variant?: Variant;
  children: ReactNode;
  onClick?: (evnet: any) => void;
}

const Main = styled.button<IProps>`
  position: relative;
  overflow: hidden;
  outline: none;
  border: none;
  border-radius: ${props => props.rounded ? '50%' : '4px'};
  height: ${props => props.size};
  line-height: ${props => props.size};
  padding: 0 10px;
  color: ${props => props.theme.color.justWhite};
  background-color: ${props => props.theme.color[props.variant || Variant.PRIMARY]} !important;
`;

const Button = ({ children, size, rounded, variant, onClick = noop }: IProps) => (
  <Main onClick={onClick} variant={variant} rounded={rounded} size={size}>
    {children}
  </Main>
);

export default Button;
