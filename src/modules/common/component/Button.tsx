import React, { ReactNode } from 'react';
import { noop } from 'lodash';
import styled from 'styled-components';

import Variant from '~/constants/variant';
import { darken, lighten } from 'polished';

interface IProps {
  className?: string;
  size?: number;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  variant?: Variant;
  children: ReactNode;
  oval?: boolean;
  onClick?: (evnet: any) => void;
  onMouseDown?: (event: any) => void;
}

const Main = styled.button.attrs(props => ({
  diabled: props.disabled,
}))<IProps>`
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

    &:hover {
      color: ${props.theme.justWhite};
    }
  `}
  ${props => props.oval && `
    border-radius: ${props.size ? props.size * 0.618 : 25}px;
  `}

  ${props => props.disabled ? `
    cursor: not-allowed;
    background: ${lighten(.05, props.theme[props.variant || Variant.PRIMARY])};
  ` : `
    &:hover {
      background: ${darken(.05, props.theme[props.variant || Variant.PRIMARY])};
    }

    &:active {
      background: ${darken(.08, props.theme[props.variant || Variant.PRIMARY])};
    }
  `}
`;

const Button = ({ children, onClick = noop, ...props }: IProps) => (
  <Main onClick={onClick} {...props}>
    {children}
  </Main>
);

export default Button;
