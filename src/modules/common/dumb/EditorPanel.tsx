import React from 'react';
import styled from 'styled-components';

import UpdateArticleForm, { IForm } from '~/modules/article/component/UpdateArticleForm';
import { convertToRaw } from 'draft-js';

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
  const handleSubmit = (values: IForm) => {
    const { title } = values;
    const contentState = values.content.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    title;
    rawContent;
  };

  return (
    <Main className={className}>
      <UpdateArticleForm onSubmit={handleSubmit}/>
    </Main>
  );
};

export default EditorPanel;
