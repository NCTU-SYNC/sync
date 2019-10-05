import React from 'react';
import LinkBase from 'next/link';
import styled from 'styled-components';

interface IProps {
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

const Main = styled.span`
  cursor: pointer;
`;

const Link = ({to = '/', className, children }: IProps) => (
  <LinkBase href={to}>
    <Main className={className}>{children}</Main>
  </LinkBase>
);

export default Link;
