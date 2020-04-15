import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Navbar from '~/modules/common/dumb/Navbar';
import Footer from '~/modules/common/dumb/Footer';
import Button from '~/modules/common/component/Button';
import PostContent from '~/modules/post/component/PostContent';
import { IPost } from '~/modules/post/interface/IPost';

// import axios from 'axios';
import { getArticle } from '~/modules/article/action';

// import fake from '~/fake/new_posts';
// import fakeContent from '~/fake/post_contents';

const Main = styled.main`
  display: flex;
  padding: 20px 40px;
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 80px);
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
`;

const ButtonGroup = styled.div``;

const StyledGreyButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  background-color: ${props => props.theme.justWhite};
  color: ${props => props.theme.textLight};
  border: 1px solid ${props => props.theme.textLight};
  margin-right: 10px;
`;

const StyledButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  background-color: ${props => props.theme.justWhite};
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  margin-left: 10px;
`;

const Post = (props: any,post: IPost) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/post/${props.pid}/edit`);
  };

  const dispatch = useDispatch();
  const [ article, setArticle ] = useState({title: '', blocks: [], tags: []});

  const getArticleContent = async ()=>{
    const res: any = await dispatch(getArticle(props.pid));
    if (res.status === 200) {
      setArticle(res.data.data);
    }
  };

  useEffect(() => {
    getArticleContent();
  }, []);

  return (
    <>
      <Navbar />
      <Main>
        <Content>
          <ToolBar>
            <ButtonGroup>
              <StyledGreyButton size={35} outline>文章</StyledGreyButton>
              <StyledGreyButton size={35} outline>討論區</StyledGreyButton>
            </ButtonGroup>
            <ButtonGroup>
              <StyledButton size={35} oval outline>歷史紀錄</StyledButton>
              <StyledButton size={35} oval outline onClick={handleEdit}>編輯新聞</StyledButton>
            </ButtonGroup>
          </ToolBar>
          <PostContent post={post} postContent={post.content} tags={article.tags} title={article.title} blocks={article.blocks}/>
        </Content>
      </Main>
      <Footer />
    </>
  );
};

Post.getInitialProps = async ({ query }: any) => {
  return query;
};

export default Post;
