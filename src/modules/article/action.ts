import { createAction } from 'redux-actions';
import { ASYNC_TYPES } from '~/constants/actionTypes';

export const listArticle = createAction(
  ASYNC_TYPES.LIST_ARTICLE.REQUEST,
  (payload: { query?: string }) => ({
    ...payload.query && { q: payload.query },
  }),
);

export const createArticle = createAction(
  ASYNC_TYPES.CREATE_ARTICLE.REQUEST,
  (payload: { title: string; blocks: string; entityMap: string }) => payload,
);

export const updateArticle = createAction(
  ASYNC_TYPES.UPDATE_ARTICLE.REQUEST,
  (payload: { _id: string, title: string; blocks: string; entityMap: string }) => payload,
);
