import React, { useMemo } from 'react';
import styled from 'styled-components';

import Link from '~/modules/common/component/Link';

import { IPost, IPostContentObject } from '../interface/IPost';

interface IProps {
  post: IPost;
}

const Main = styled(Link)`
  display: flex;
  padding: 20px 10px;
  border-bottom: 1px solid ${props => props.theme.textLightMore};

  &:hover {
    transition: 0.2s;
    background-color: ${props => props.theme.textLightMore};
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  font-weight: 500;
  line-height: 1.4;
`;

const Title = styled.div`
  color: ${props => props.theme.textDark};
  font-size: 20px;
  margin-bottom: 20px;
`;

const Excerpt = styled.div`
  color: ${props => props.theme.textLightMedium};
  font-size: 15px;
`;

const Foot = styled.div`
  display: flex;
  margin-top: 20px;
  font-size: 14px;
  color: ${props => props.theme.textLightMedium};
`;

const Tag = styled.div`
  flex: 1;
  color: ${props => props.theme.textLightMedium};
`;

const Status = styled.div<{ hot?: boolean }>`
  font-weight: 400;
  margin-right: 20px;

  &::before {
    content: '';
    display: inline-flex;
    align-self: center;
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: ${props => props.hot ? 'red' : 'green'};
  }
`;

const Count = styled.div`
  font-weight: 400;
`;

const Img = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${props => props.theme.imageBg};
`;

const PostStatus = ({ editingCount, isPopular }: Partial<IPost>) => {
  if(editingCount && editingCount > 0){
    return <Status>編輯中</Status>;
  }

  if(isPopular){
    return <Status hot>熱門編輯</Status>;
  }

  return null;
};


const PostEntry = ({ post }: IProps) => {
  const toTimeString = useMemo(() => (date: string) => (
    date.split('T')[0]
  ), [ post ]);

  const getExcerpt = (blocks: Array<IPostContentObject>)=>{
    var excerpt = '';
    blocks.forEach((block: IPostContentObject)=>{
      if(block.text !== undefined && block.text !== null)
        excerpt += block.text;
    });
    excerpt = excerpt.substring(0, 40) + '...';
    return excerpt;
  };

  return (
    <Main to='/post/[pid]' mask={`/post/${post._id}`}>
      <Body>
        <Title>{post.title}</Title>
        <Excerpt>{getExcerpt(post.content.blocks)}</Excerpt>
        <Foot>
          <Tag>{post.category} {toTimeString(post.createdAt)}</Tag>
          <PostStatus editingCount={post.editingCount} isPopular={post.isPopular}/>
          <Count>編輯次數：{post.editedCount}</Count>
        </Foot>
      </Body>
      <Img/>
    </Main>
  );
};


export default PostEntry;
