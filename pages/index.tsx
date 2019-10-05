import React from 'react';
import styled from 'styled-components';

import Navbar from '~/modules/common/component/Navbar';
import Input from '~/modules/common/component/Input';
import Button from '~/modules/common/component/Button';
import Icon from '~/modules/common/component/Icon';

const Content = styled.div`
  padding: 20px 40px;
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
  margin-right: 10px;
`;

const StyledButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
`;

const StyledIcon = styled(Icon)`
  padding: 5px;
  background-color: ${props => props.theme.textLightMore};
  color: white;
  fill: ${props => props.theme.textLightMedium};
`;

const Layout = () => {
  return(
    <>
      <Navbar/>
      <Content>
        <ToolBar>
          <StyledInput
            left={<StyledButton size={35}>搜尋</StyledButton>}
            right={<StyledIcon type='search' size={35}/>}/>
          <StyledInput placeholder='Filter'/>
          <StyledButton size={35} outline>撰寫新聞</StyledButton>
        </ToolBar>
      </Content>
    </>
  );
};

export default Layout;
