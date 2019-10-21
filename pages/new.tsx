import React from 'react';
import styled from 'styled-components';

import SearchPanel from '~/modules/post/component/searchPanel';

import Navbar from '~/modules/common/dumb/Navbar';
import EditorPanel from '~/modules/common/dumb/EditorPanel';

const Main = styled.div`
  height: 100%;
`;

const Body = styled.div`
  display: flex;
  position: relative;
  height: calc(100% - ${props => props.theme.HEADER_HEIGHT}px);
`;

const New = () => {
  return (
    <Main>
      <Navbar/>
      <Body>
        <EditorPanel/>
        <SearchPanel/>
      </Body>
    </Main>
  );
};

export default New;
