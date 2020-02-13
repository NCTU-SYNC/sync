import { handleActions } from 'redux-actions';
import { createPaginationReducers, createInitialPaginatableState } from '../common/redux/pagination';
import { ASYNC_TYPES } from '~/constants/actionTypes';
import { IPaginatableState } from '~/modules/common/redux/pagination';

export interface IAritcle {
  _id: string;
  title: string;
  timeStamp: string;
  outline: string;
}

export interface IArticleState extends IPaginatableState<IAritcle> {}

const ArticleRducer = handleActions({
  ...createPaginationReducers<IAritcle>({
    list: [ ASYNC_TYPES.LIST_ARTICLE ],
    update: [ ASYNC_TYPES.CREATE_ARTICLE, ASYNC_TYPES.UPDATE_ARTICLE ],
  })
}, {
  ...createInitialPaginatableState<IAritcle>()
});

export default ArticleRducer;
