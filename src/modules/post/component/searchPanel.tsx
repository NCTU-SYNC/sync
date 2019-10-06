import React from 'react';
import Panel from '~/modules/common/component/Panel';
import { InputGroup } from '~/modules/common/component/Input';
import Icon from '~/modules/common/component/Icon';
import styled from 'styled-components';

import { IPost } from '../interface/IPost';

import fake from '~/fake/posts';
import Button from '~/modules/common/component/Button';

interface IEntry {
  post: IPost;
}

const SearchField = styled(InputGroup)`
  overflow: hidden;
  border: none;
  border-radius: 4px;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  padding: 5px;
  background-color: ${props => props.theme.textLightMore};
  color: white;
  fill: ${props => props.theme.textLightMedium};
`;

const Tags = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.textLightMedium};
`;

const Tag = styled.span`
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 10px;
  border: 1px solid ${props => props.theme.textLightMedium};
  color: ${props => props.theme.textDark};
  border-radius: 4px;
  font-size: 13px;
  transition: 0.2s;

  &:hover {
    border-color: ${props => props.theme.textDark};
    color: black;
  }
`;

const Main = styled.div`
  border-radius: 4px;
  margin-top: 10px;
  padding: 15px;
  background-color: ${props => props.theme.justWhite};
  line-height: 1.6;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: ${props => props.theme.textLightDark};
`;

const Content = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textLightMedium};
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 5px;
`;

const FakeLink = styled.span`
  cursor: pointer;
  flex: 1;
  font-size: 10px;
  color: ${props => props.theme.primary};
  text-decoration: underline;
`;

const StyledButton = styled(Button)`
  padding: 6px 20px;
  margin-right: 5px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: normal;
`;

const SearchEntry = ({ post }: IEntry) => (
  <Main>
    <Title>{post.title}</Title>
    <Content>{post.excerpt}</Content>
    <Bottom>
      <FakeLink>收起此篇新聞</FakeLink>
      <StyledButton>引用全文</StyledButton>
    </Bottom>
  </Main>
);

const SearchPanel = () => (
  <Panel>
    <SearchField right={<StyledIcon size={35} type='search'/>}/>
    <Tags>
      <Tag>時間</Tag>
      <Tag>新聞來源</Tag>
    </Tags>
    {fake.map(post => <SearchEntry key={post.id} post={post}/>)}
  </Panel>
);

export default SearchPanel;
