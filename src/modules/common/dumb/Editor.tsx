import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
}

const Main = styled.div`
  flex: 1;
  height: 100%;
  background-color: ${props => props.theme.justWhite};
`;

const Editor = ({ className }: IProps) => (
  <Main className={className}>
    This is Editor.
  </Main>
);

export default Editor;
