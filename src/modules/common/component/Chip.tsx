import React, { ReactNode } from 'react';
import { noop } from 'lodash';
import styled from 'styled-components';

import Variant from '~/constants/variant';

interface IProps {
  className?: string;
  size: number;
  rounded?: boolean;
  variant?: Variant;
  children: ReactNode;
  onClick?: (evnet: any) => void;
}

const Main = styled.div<IProps>`
  display: inline-block;
  position: relative;
  font-size: 12px;
  overflow: hidden;
  border: none;
  height: ${props => props.size}px;
  line-height: ${props => props.size}px;
  padding: 0 15px;
  margin: 5px;
  color: ${props => props.theme.textDark};
  background-color: ${props => props.theme.chipBg};
  border-radius: ${props => props.size * 0.618}px;
`;

const Chip = ({ children, onClick = noop, ...props }: IProps) => (
  <Main onClick={onClick} {...props}>
    {children}
  </Main>
);

export default Chip;
