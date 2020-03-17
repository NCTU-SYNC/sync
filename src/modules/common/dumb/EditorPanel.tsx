import React from 'react';
import styled from 'styled-components';

import UpdateArticleForm, { IForm } from '~/modules/article/component/UpdateArticleForm';
import { convertToRaw } from 'draft-js';
import { useDispatch } from 'react-redux';
import { createArticle } from '~/modules/article/action';
import { useRouter } from 'next/router';

interface IProps {
  className?: string;
}

const Main = styled.div`
  flex: 1;
  height: 100%;
  min-width: 350px;
  background-color: ${props => props.theme.justWhite};
  padding: 0 10px 10px;
`;

const EditorPanel = ({ className }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (values: IForm) => {
    const { title, tags } = values;
    const contentState = values.content.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const data = {
      title,
      tags,
      blocks: JSON.stringify(rawContent.blocks),
      entityMap: JSON.stringify(rawContent.entityMap)
    };

    const res: any = await dispatch(createArticle(data));
    if (res.status === 200) {
      const id = res.data.id;
      router.push(`/post/${id}`);
      return;
    }
  };

  return (
    <Main className={className}>
      <UpdateArticleForm onSubmit={handleSubmit}/>
    </Main>
  );
};

export default EditorPanel;
