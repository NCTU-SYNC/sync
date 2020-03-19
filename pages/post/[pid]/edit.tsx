import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import SearchPanel from '~/modules/post/component/searchPanel';
import Navbar from '~/modules/common/dumb/Navbar';
import UpdateArticleForm, { IForm } from '~/modules/article/component/UpdateArticleForm';

import fake from '~/fake/new_posts';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import { updateArticle } from '~/modules/article/action';
import { oc } from 'ts-optchain';

const Main = styled.div`
  height: 100%;
`;
const Body = styled.div`
  display: flex;
  position: relative;
  height: calc(100% - ${props => props.theme.HEADER_HEIGHT}px);
`;
const Wrpper = styled.div`
  flex: 1;
  height: 100%;
  min-width: 350px;
  background-color: ${props => props.theme.justWhite};
  padding: 0 10px 10px;
`;

const EditPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pid } = router.query;
  const post = fake[parseInt(pid as string)];

  if (!post) {
    return null;
  }

  const handleSubmit = async (values: IForm) => {
    const { title, tags } = values;
    const contentState = values.content.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    const data = {
      id: pid as string,
      title,
      tags,
      blocks: JSON.stringify(rawContent.blocks),
      entityMap: JSON.stringify(rawContent.entityMap)
    };

    const res: any = await dispatch(updateArticle(data));
    if (res.status === 200) {
      const id = res.data.id;
      router.push(`/post/${id}`);
      return;
    }
  };

  const initialValues: IForm = {
    title: oc(post).title(''),
    tags: oc(post).tags([]),
    content: EditorState.createWithContent(ContentState.createFromText(oc(post).excerpt(''))),
  };

  return (
    <Main>
      <Navbar/>
      <Body>
        <Wrpper>
          <UpdateArticleForm initialValues={initialValues} onSubmit={handleSubmit}/>
        </Wrpper>
        <SearchPanel/>
      </Body>
    </Main>
  );
};

export default EditPost;
