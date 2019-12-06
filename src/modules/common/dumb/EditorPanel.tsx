import React from 'react';
import styled from 'styled-components';

import Variant from '~/constants/variant';

import Button from '../component/Button';
import CustomEditor from '../../editor';

interface IProps {
  className?: string;
}

const Main = styled.div`
  flex: 1;
  height: 100%;
  background-color: ${props => props.theme.justWhite};
  padding: 10px;
`;
const ToolBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.textLight};
  }
`;
const Wrapper = styled.div`
  flex: 1;
`;
const StyledButton = styled(Button)`
  border: 1px solid ${props => props.variant === Variant.NONE ? props.theme.textLight : 'transparent'};
  padding: 5px 15px;
  margin-right: 10px;
`;
const Action = styled.div`
  position: relative;
  width: 100%;
`;
const StyledEditor = styled(CustomEditor)`
  height: calc(100% - 80px);
  margin: 10px 0;
  border: 1px solid ${props => props.theme.textLightMedium};
`;

const EditorPanel = ({ className }: IProps) => (
  <Main className={className}>
    <ToolBar>
      <Wrapper>
        <StyledButton variant={Variant.NONE}>新聞原文</StyledButton>
        <StyledButton variant={Variant.NONE}>歷史紀錄</StyledButton>
      </Wrapper>
      <StyledButton>編輯新聞</StyledButton>
    </ToolBar>
    <StyledEditor/>
    <Action>
      <StyledButton>預覽</StyledButton>
      <StyledButton>發布</StyledButton>
    </Action>
  </Main>
);

export default EditorPanel;
