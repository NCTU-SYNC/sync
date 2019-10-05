import React from 'react';
import { useRouter } from 'next/router';

import fake from '~/fake/posts';

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;
  const post = fake[parseInt(pid as string)];

  if(post){
    return <p>{post.title}</p>;
  }

  return null;
};

export default Post;
