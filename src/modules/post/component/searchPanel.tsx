import React, { useRef } from 'react';
import { oc } from 'ts-optchain';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/modules/common/component/Button';
import Panel from '~/modules/common/component/Panel';
import { InputGroup } from '~/modules/common/component/Input';
import Icon from '~/modules/common/component/Icon';

import { IState } from '~/modules/common/redux/reducers';
import { IAritcle } from '~/modules/article/reducer';
import { listNews } from '~/modules/news/action';
import { getPaginationKey } from '~/modules/common/redux/getPaginationKey';
import { darken } from 'polished';
import copyToClipboard from '~/modules/common/utils/copyToClipboard';

interface IEntry {
  article: IAritcle;
}

const SearchField = styled(InputGroup)`
  overflow: hidden;
  border: none;
  border-radius: 4px;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  padding: 5px;
  background-color: ${props => props.theme.justWhite};
  color: white;
  fill: blue;
  transition: 0.3s;

  &:hover {
    fill: white;
    background: ${props => darken(.3, props.theme.textLightMore)};
  }

  &:active {
    fill: white;
    background: ${props => darken(.15, props.theme.textLightMore)};
  }
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
  cursor: not-allowed;
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
const Message = styled.div`
  width: 100%;
  text-align: center;
  color: ${props => props.theme.textLightDark};
`;

const SearchEntry = ({ article }: IEntry) => {
  const handleClick = () => {
    copyToClipboard(`${article.title}\n\n${article.outline}`);
  };

  return (
    <Main>
      <Title>{article.title}</Title>
      <Content>{article.outline}</Content>
      <Bottom>
        <FakeLink>收起此篇新聞</FakeLink>
        <StyledButton onClick={handleClick}>複製全文</StyledButton>
      </Bottom>
    </Main>
  );
};

const SearchPanel = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const paginationKey = getPaginationKey({
    ...oc(ref.current).value('') && { q: oc(ref.current).value('') }
  });

  const loading = useSelector((state:IState) => (
    oc(state).news.paginations[paginationKey].loading(false)));

  const articles = useSelector((state:IState) => (
    oc(state).news.paginations[paginationKey].index([])
  ).map(id => state.news.data[id]));

  const handleSearch = (value?: string) => {
    dispatch(listNews({
      q: value || oc(ref.current).value(''),
    }));
  };

  return (
    <Panel>
      <SearchField
        ref={ref}
        right={<StyledIcon size={35} type='search'/>}
        placeholder='開始搜尋你有興趣的新聞'
        onSumbit={handleSearch}/>
      <Tags>
        <Tag>時間</Tag>
        <Tag>新聞來源</Tag>
      </Tags>
      {loading
        ? 'loading...'
        : articles.length > 0
          ? articles.map(article => (
            <SearchEntry key={article['_id']} article={article}/>
          ))
          : paginationKey !== 'default' && <Message>查無相關新聞</Message>
      }
    </Panel>
  );
};

export default SearchPanel;
