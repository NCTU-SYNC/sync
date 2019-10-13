import React from 'react';
import styled from 'styled-components';

import { IPost } from '../interface/IPost';

interface IProps {
  className?: string;
  post: IPost;
}

const Main = styled.div`
  width: 100%;
`;

const Body = styled.div`
  width: 60%;
  margin: 60px auto;
`;

const Title = styled.div`
  color: ${props => props.theme.textDark};
  font-size: 24px;
  margin-bottom: 30px;
`;

const Img = styled.div`
  width: 100%;
  height: 300px;
  margin: 5px 0;
  background-color: ${props => props.theme.imageBg};
`;

const Excerpt = styled.div`
  color: ${props => props.theme.textLightMedium};
  font-size: 15px;
  margin: 30px 0;
  line-height: 1.4;
  letter-spacing: 1px;
`;

const PostContent = ({ post, className }: IProps) => (
  <Main className={className}>
    <Body>
      {
        post && 
        <>
          <Title>{post.title}</Title>
          <Img/>
          <Excerpt>{post.excerpt}</Excerpt>
          <Img/>
        </>
      }
    </Body>
  </Main>
);

export default PostContent;
