import React from 'react';
import styled from 'styled-components';

import Navbar from '~/modules/common/component/Navbar';
import Input from '~/modules/common/component/Input';
import Button from '~/modules/common/component/Button';
import Icon from '~/modules/common/component/Icon';

import fake from '~/fake/post';
import PostList from '~/modules/post/component/PostList';

const Main = styled.main`
  display: flex;
  padding: 20px 40px;
`;

const Content = styled.div`
  flex: 1;
  width: 60%;
`;

const StyledPostList = styled(PostList)`
  margin-top: 30px;
`;

const SideBar = styled.div``;

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
      <Main>
        <Content>
          <ToolBar>
            <StyledInput
              left={<StyledButton size={35}>搜尋</StyledButton>}
              right={<StyledIcon type='search' size={35}/>}/>
          </ToolBar>
          <StyledPostList posts={fake}/>
        </Content>
        <SideBar>
          <ToolBar>
            <Input placeholder='Filter'/>
            <StyledButton size={35} outline>撰寫新聞</StyledButton>
          </ToolBar>
        </SideBar>
      </Main>
    </>
  );
};

export default Layout;
