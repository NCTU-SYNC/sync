import React from 'react';
import styled from 'styled-components';

import Chip from '~/modules/common/component/Chip';

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
  margin-bottom: 20px;
`;

const Img = styled.div`
  width: 100%;
  height: 300px;
  margin: 5px 0;
  background-color: ${props => props.theme.imageBg};
`;

const Excerpt = styled.div`
  color: ${props => props.theme.textLightMedium};
  font-size: 16px;
  margin: 30px 0;
  line-height: 1.4;
  letter-spacing: 0.6px;
`;

const Content = styled.div`
  margin: 15px 0;
`;

const Blank = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 2px solid ${props => props.theme.textLight};
  margin-bottom: 15px;
`;

const Quote = styled.div`
  width: 100%;
  color: ${props => props.theme.textLightMedium};
  font-size: 14px;
`;

const PostContent = ({ post, className }: IProps) => (
  <Main className={className}>
    <Body>
      {
        post && 
        <>
          <Title>{post.title}</Title>
          <Chip size={25}>#hashtag</Chip>
          <Chip size={25}>#Microsoft</Chip>
          <Chip size={25}>#Google</Chip>
          <Content>
            <Img/>
            <Excerpt>{post.excerpt}</Excerpt>
            <Img/>
            <Excerpt>{post.excerpt}</Excerpt>
            <Blank/>
            <Quote>[注1] Life is like riding a bicycle. To keep your balance, you must keep moving.
—— Albert Einstein</Quote>
            <Quote>[注2] 小時候雖然窮但是很快樂，現在不一樣了，不僅窮還不快樂。
—— 毒雞湯</Quote>
            <Quote>[注3] 女人也許會欺騙你，兄弟也許會背叛你，但數學不會，數學不會就是不會。
—— 毒雞湯</Quote>
          </Content>
        </>
      }
    </Body>
  </Main>
);

export default PostContent;
