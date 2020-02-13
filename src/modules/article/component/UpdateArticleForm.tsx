import React from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import { EditorState } from 'draft-js';

import Variant from '~/constants/variant';
import Button from '~/modules/common/component/Button';
import UpdateArticleFormContent from './UpdateArticleFormContent';

export interface IForm {
  title: string;
  // tags: Array<string>;
  content: EditorState;
}

interface IProps {
  onSubmit: (values: IForm) => void;
}

const StyledForm = styled.form`
  height: 100%;
`;
const Submit = styled(Button).attrs({ type: 'submit' })`
  border: 1px solid ${props => props.variant === Variant.NONE ? props.theme.textLight : 'transparent'};
  padding: 5px 15px;
  margin-right: 10px;
`;
const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
`;

const UpdateArticleForm = ({ onSubmit }: IProps) => (
  <Form<IForm> onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
        <UpdateArticleFormContent/>
        <Action>
          <Submit>發布</Submit>
        </Action>
      </StyledForm>
    )}
  </Form>
);

export default UpdateArticleForm;
