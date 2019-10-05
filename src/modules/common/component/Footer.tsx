import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
`;

const Copyright = styled.div`
  flex: 1;
`;

const ToolBar = styled.div``;

const Footer = () => (
  <Main>
    <Copyright>
      &copy; 2018 Mass Impression. Designed by Tran Mau Tri Tam
    </Copyright>
    <ToolBar>

    </ToolBar>
  </Main>
);

export default Footer;
