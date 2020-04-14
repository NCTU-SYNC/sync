import { handleActions } from 'redux-actions';
import { createPaginationReducers, createInitialPaginatableState } from '../common/redux/pagination';
import { ASYNC_TYPES } from '~/constants/actionTypes';
import { IPaginatableState } from '~/modules/common/redux/pagination';

export interface INews {
  _id: string;
  title: string;
  timeStamp: string;
  outline: string;
}

export interface INewsState extends IPaginatableState<INews> {}

const NewsReducer = handleActions({
  ...createPaginationReducers<INews>({
    list: [ ASYNC_TYPES.LIST_NEWS ],
  })
}, {
  ...createInitialPaginatableState<INews>()
});

export default NewsReducer;
