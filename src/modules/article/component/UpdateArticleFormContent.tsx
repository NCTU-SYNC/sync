import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const RichEditor = dynamic(() => import('../../editor'), { ssr: false });

const Wrapper = styled.div`
  height: calc(100% - 50px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.textLightMedium};
`;
const StyledInput = styled.input.attrs(props => ({
  placeholder: props.placeholder,
  autoComplete: 'off',
}))`
  width: 100%;
  margin-bottom: 12px;
  border: none;
  border-bottom: 1px solid ${props => props.theme.textLightMedium};
  outline: none;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  padding: 4px 5px;

  &::placeholder {
    color: ${props => props.theme.textLightMedium};
  }
`;
const Editor = styled(RichEditor)`
  height: calc(100% - 39px - 39px - 20px);
`;

const UpdateArticleFormContent = () => (
  <Wrapper>
    <Field
      name='title'
      render={({ input }) => <StyledInput name={input.name} placeholder='標題...' onChange={input.onChange}/>}/>
    <Field
      name='tags'
      render={({ input }) => <StyledInput name={input.name} placeholder='關鍵字...' onChange={input.onChange}/>}/>
    <Field
      name='content'
      render={({ input }) => (
        <Editor
          name={input.name}
          onChange={(content: any) => input.onChange(content.value) as any}/>
      )}/>
  </Wrapper>
);

export default UpdateArticleFormContent;
