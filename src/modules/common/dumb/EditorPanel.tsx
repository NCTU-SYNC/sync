import React from 'react';
import styled from 'styled-components';

import UpdateArticleForm, { IForm } from '~/modules/article/component/UpdateArticleForm';
import { convertToRaw } from 'draft-js';
import { useDispatch } from 'react-redux';
import { createArticle } from '~/modules/article/action';
import { useRouter } from 'next/router';
import { IAritcle } from '~/modules/article/reducer';

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
    const { title } = values;
    const contentState = values.content.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    const res: any = await dispatch(createArticle({
      title,
      blocks: JSON.stringify(rawContent.blocks),
      entityMap: JSON.stringify(rawContent.entityMap),
    }));

    if (res.ok) {
      const { _id } = res.payload as IAritcle;
      router.push(`/post/${_id}`);
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
