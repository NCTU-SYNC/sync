import React from 'react';
import styled from 'styled-components';

import PostEntry from './PostEntry';

import { IPost } from '../interface/IPost';

interface IProps {
  className?: string;
  posts: IPost[];
}

const Main = styled.div`
  width: 100%;
`;

const PostList = ({ posts, className }: IProps) => (
  <Main className={className}>
    {posts.map(post => <PostEntry key={post._id} post={post}/>)}
  </Main>
);

export default PostList;
