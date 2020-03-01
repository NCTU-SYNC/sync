import React from 'react';
import styled from 'styled-components';

import Chip from '~/modules/common/component/Chip';
import PostCarousel from './PostCarousel';
import OfferBlock from '~/modules/common/dumb/OfferBlock';

import { INewPost } from '../interface/IPost';
import { IPostContent } from '../interface/IPost';

interface IProps {
  className?: string;
  post: INewPost;
  postContent: IPostContent;
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

const TagMain = styled.div`
  width: 100%;
`;

const QuoteMain = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const Quote = styled.div`
  width: 100%;
  color: ${props => props.theme.textLightMedium};
  font-size: 14px;
`;

const OfferMain = styled.main`
  display: flex;
  padding: 20px 40px;
`;


const PostContent = ({ post, className }: IProps) => (
  <>
    <Main className={className}>
      <Body>
        {
          post &&
          <>
            <Title>{post.title}</Title>
            <TagMain>
              {post.tags && post.tags.map(tag => <Chip key={tag} size={25}>#{tag}</Chip>)}
            </TagMain>
            <Content>
              <Img/>
              <Excerpt>{post.excerpt}</Excerpt>
              <Img/>
              <Excerpt>{post.excerpt}</Excerpt>
              <Blank/>
              <QuoteMain>
                {
                  post.quotes && post.quotes.map((quote, index) =>
                    <Quote key={quote}>{`[注${index+1}]: ${quote}`}</Quote>
                  )
                }
              </QuoteMain>
            </Content>
          </>
        }
      </Body>
    </Main>
    <PostCarousel/>
    <OfferMain><OfferBlock/></OfferMain>
  </>
);

export default PostContent;
