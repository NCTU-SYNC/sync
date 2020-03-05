import React from 'react';
import LinkBase from 'next/link';
import styled from 'styled-components';

interface IProps {
  to?: string;
  mask?: string;
  className?: string;
  children?: React.ReactNode;
}

const Main = styled.span`
  cursor: pointer;
`;

const Link = ({to = '/', mask, className, children }: IProps) => (
  <LinkBase href={to} as={mask}>
    <Main className={className}>{children}</Main>
  </LinkBase>
);

export default Link;
