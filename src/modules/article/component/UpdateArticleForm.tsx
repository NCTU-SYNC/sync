import React from 'react';
import { Form, useFormState } from 'react-final-form';
import styled from 'styled-components';
import { EditorState } from 'draft-js';

import Variant from '~/constants/variant';
import Button from '~/modules/common/component/Button';
import Content from './UpdateArticleFormContent';

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

const Footer = () => {
  const { submitting, invalid } = useFormState();

  return (
    <Action>
      <Submit disabled={submitting || invalid}>發布</Submit>
    </Action>
  );
};

const UpdateArticleForm = ({ onSubmit }: IProps) => (
  <Form<IForm>
    onSubmit={onSubmit}
    validate={values => ({ ...!values.title && { title: 'required' } })}>
    {({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
        <Content/>
        <Footer/>
      </StyledForm>
    )}
  </Form>
);

export default UpdateArticleForm;
