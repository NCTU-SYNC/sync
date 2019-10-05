import React from 'react';
import styled from 'styled-components';
import Icon from '../component/Icon';

const Main = styled.div`
  display: flex;
  padding: 20px 10px 0;
  border-top: 1px solid ${props => props.theme.textLight};
  margin: 10px 20px 80px;
  color: ${props => props.theme.textLightMedium};
  font-size: 14px;
`;

const Copyright = styled.div`
  flex: 1;
`;

const ToolBar = styled.div``;

const StyledIcon = styled(Icon)`
  margin-left: 30px;
  fill: ${props => props.theme.textLightMedium};
`;

const Footer = () => (
  <Main>
    <Copyright>
      &copy; 2018 Mass Impression. Designed by Tran Mau Tri Tam
    </Copyright>
    <ToolBar>
      <StyledIcon size={20} type='fb'/>
      <StyledIcon size={20} type='twitter'/>
      <StyledIcon size={20} type='ig'/>
    </ToolBar>
  </Main>
);

export default Footer;
