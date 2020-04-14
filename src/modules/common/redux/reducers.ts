import { combineReducers } from 'redux';

import article, { IArticleState } from '~/modules/article/reducer';
import news, { INewsState } from '~/modules/news/reducer';

export interface IState {
  article: IArticleState;
  news: INewsState;
}

export default combineReducers({
  article,
  news,
});
