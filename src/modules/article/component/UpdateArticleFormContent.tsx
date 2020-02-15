import React from 'react';
import { Field } from 'react-final-form';
import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import TagInput from './TagInput';

const RichEditor = dynamic(() => import('../../editor'), { ssr: false });

const Wrapper = styled.div`
  height: calc(100% - 50px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.textLightMedium};
`;
const inputMixin = css`
  width: 100%;
  border: none;
  outline: none;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  border-bottom: 1px solid ${props => props.theme.textLightMedium};
`;
const StyledInput = styled.input.attrs(props => ({
  placeholder: props.placeholder,
  autoComplete: 'off',
}))`
  ${inputMixin}
  margin-bottom: 12px;
  padding: 4px 5px;

  &::placeholder {
    color: ${props => props.theme.textLightMedium};
  }
`;
const StyledTagInput = styled(TagInput)`
  ${inputMixin}
`;
const Editor = styled(RichEditor)`
  height: calc(100% - 39px - 39px - 20px);
`;

const UpdateArticleFormContent = () => (
  <Wrapper>
    <Field
      name='title'
      render={({ input }) => <StyledInput name={input.name} value={input.value} placeholder='標題...' onChange={input.onChange}/>}/>
    <Field
      name='tags'
      render={({ input }) => <StyledTagInput name={input.name} placeholder='關鍵字...' onChange={input.onChange}/>}/>
    <Field
      name='content'
      render={({ input }) => (
        <Editor
          initialValue={input.value}
          name={input.name}
          onChange={(content: any) => input.onChange(content.value) as any}/>
      )}/>
  </Wrapper>
);

export default UpdateArticleFormContent;
