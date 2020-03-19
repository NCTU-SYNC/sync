import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Navbar from '~/modules/common/dumb/Navbar';
import Footer from '~/modules/common/dumb/Footer';
import Button from '~/modules/common/component/Button';
import PostContent from '~/modules/post/component/PostContent';
import { IPost } from '~/modules/post/interface/IPost';

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
  background-color: ${props => props.theme.justWhite};;
  color: ${props => props.theme.textLight};
  border: 1px solid ${props => props.theme.textLight};
  margin-right: 10px;
`;

const StyledButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  background-color: ${props => props.theme.justWhite};;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  margin-left: 10px;
`;

const Post = (post: IPost) => {
  const router = useRouter();
  const { pid } = router.query;

  const handleEdit = () => {
    router.push(`/post/${pid}/edit`);
  };

  return (
    <>
      <Navbar/>
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
          <PostContent post={post} postContent={post.content}/>
        </Content>
      </Main>
      <Footer/>
    </>
  );
};

export default Post;
