import { Epic, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { stringify } from 'qs';

import { ASYNC_TYPES } from '~/constants/actionTypes';

import { IAction } from '~/modules/common/redux/pagination';
import { IState } from '~/modules/common/redux/reducers';
import { IAritcle } from './reducer';
import { IResponse } from '~/constants/typings';

const listAritcle$: Epic<IAction, IAction, IState> = action$ => action$.pipe(
  ofType(ASYNC_TYPES.LIST_ARTICLE.REQUEST),
  mergeMap(action => {
    const key = stringify(action.payload);
    return ajax.getJSON<IResponse<IAritcle>>(`${process.env.API_URL}/article?${key}`)
      .pipe(
        map(res => ({
          type: ASYNC_TYPES.LIST_ARTICLE.SUCCESS,
          payload: res.data,
          ...key && { meta: { key } }
        })),
      );
  }),
);

const createArticle$: Epic<IAction, IAction, IState> = action$ => action$.pipe(
  ofType(ASYNC_TYPES.CREATE_ARTICLE.REQUEST),
  mergeMap(action => {
    return ajax.post(`${process.env.API_URL}/article`, action.payload)
      .pipe(
        map(res => ({
          type: ASYNC_TYPES.CREATE_ARTICLE.SUCCESS,
          payload: (res as any).data,
        })),
      );
  }),
);

const updateArticle$: Epic<IAction, IAction, IState> = action$ => action$.pipe(
  ofType(ASYNC_TYPES.UPDATE_ARTICLE.REQUEST),
  mergeMap(action => {
    return ajax.put(`${process.env.API_URL}/article`, action.payload)
      .pipe(
        map(res => ({
          type: ASYNC_TYPES.UPDATE_ARTICLE.SUCCESS,
          payload: (res as any).data,
        })),
      );
  }),
);

export default [
  listAritcle$,
  createArticle$,
  updateArticle$,
];
