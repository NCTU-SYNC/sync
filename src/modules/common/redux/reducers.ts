import { combineReducers } from 'redux';

import article, { IArticleState } from '~/modules/article/reducer';

export interface IState {
  article: IArticleState;
}

export default combineReducers({
  article,
});
