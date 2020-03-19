import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { listArticle } from '~/modules/article/action';
import styled from 'styled-components';

import { InputGroup } from '~/modules/common/component/Input';
import Button from '~/modules/common/component/Button';
import Icon from '~/modules/common/component/Icon';
import PostList from '~/modules/post/component/PostList';

import Navbar from '~/modules/common/dumb/Navbar';
import Footer from '~/modules/common/dumb/Footer';
import OfferBlock from '~/modules/common/dumb/OfferBlock';

const Main = styled.main`
  display: flex;
  padding: 20px 40px;
`;

const Content = styled.div`
  flex: 1;
  width: 60%;
`;

const Blank = styled.div`
  width: 100%;
  height: 200px;
`;

const StyledPostList = styled(PostList)`
  margin-top: 30px;
`;

const SideBar = styled.div``;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${props => props.theme.justWhite};
`;

const StyledInput = styled(InputGroup)`
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
  const dispatch = useDispatch();
  const router = useRouter();
  const [ articles, setArticles ] = useState([]);
  const getArticles = async ()=>{
    const res: any = await dispatch(listArticle(null));
    if (res.status === 200) {
      setArticles(res.data.data);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

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
          <StyledPostList posts={articles}/>
        </Content>
        <SideBar>
          <ToolBar>
            <StyledInput placeholder='Filter'/>
            <StyledButton size={35} outline onClick={() => router.push('/new')}>撰寫新聞</StyledButton>
          </ToolBar>
        </SideBar>
      </Main>
      <Blank/>
      <Main><OfferBlock/></Main>
      <Footer/>
    </>
  );
};

export default Layout;
