import { createAction } from 'redux-actions';
import { ASYNC_TYPES } from '~/constants/actionTypes';

interface IArgs {
  query?: string;
}

export const listArticle = createAction(
  ASYNC_TYPES.LIST_ARTICLE.REQUEST, (arg: IArgs) => ({
    ...arg.query && { q: arg.query },
  }));
