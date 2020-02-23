import { identity, uniq } from 'lodash';
import produce from 'immer';
import { Action } from 'redux-actions';

import { AsyncActionStatus, IAsyncActionType } from '~/constants/actionTypes';
import createAsyncActionHandlers from '~/modules/common/redux/createAsyncActionHandlers';

const DEFAULT_PAGINATION_KEY = 'default';

export interface IMeta {
  key?: string;
}

export interface IAction<Payload = any> extends Action<Payload> {
  meta?: IMeta;
}

interface ICreateReducerTypes {
  list?: IAsyncActionType[];
  update?: IAsyncActionType[];
  destroy?: IAsyncActionType[];
}

interface ICreateReducerOptions<S> {
  getPkKey?: (res: S) => string;
  transform?: (res: any) => S;
}

export interface IPagination {
  loading: boolean;
  index: string[];
}

export interface IPaginatableState<S> {
  data: {
    [id: string]: S;
  };
  paginations: { [pkKey: string]: IPagination };
}

export const createInitialPaginatableState = <S>(): IPaginatableState<S> => ({
  data: {},
  paginations: {},
});

export const getDefaultPagination = (): IPagination => ({
  index: [],
  loading: false,
});

const defaultGetPkKey = (item: any) => item['_id'];

const listActionHandlers = <S>(options: Required<ICreateReducerOptions<S>>) => ({
  [AsyncActionStatus.REQUEST]: (state: IPaginatableState<S>, {
    meta: { key = DEFAULT_PAGINATION_KEY } = {},
  }) => produce(state, draft => {
    const pagination = draft.paginations[key] || getDefaultPagination();
    pagination.loading = true;

    draft.paginations[key] = pagination;
  }),

  [AsyncActionStatus.SUCCESS]: (state: IPaginatableState<S>, {
    payload,
    meta: { key = DEFAULT_PAGINATION_KEY } = {},
  }: IAction<any>) => produce(state, draft => {
    const pagination = draft.paginations[key] || getDefaultPagination();

    pagination.loading = false;

    if (!payload) return;

    let newIndices = payload.map((item: any) => options.getPkKey(item));
    pagination.index = uniq(pagination.index.concat(newIndices));

    payload.forEach((item: any) => {
      const key = options.getPkKey(item);
      draft.data[key] = options.transform(item) as any;
    });

    draft.paginations[key] = pagination;
  }),

  [AsyncActionStatus.FAILURE]: (state: IPaginatableState<S>, {
    payload, // eslint-disable-line no-unused-vars
    meta: { key = DEFAULT_PAGINATION_KEY } = { key: DEFAULT_PAGINATION_KEY },
  }: IAction<any>) => produce(state, draft => {
    const pagination = draft.paginations[key] || getDefaultPagination();
    pagination.loading = false;

    draft.paginations[key] = pagination;
  }),
});

const updateActionHandlers = <S>(options: Required<ICreateReducerOptions<S>>) => ({
  [AsyncActionStatus.REQUEST]: (state: IPaginatableState<S>, {
    meta: { key = DEFAULT_PAGINATION_KEY } = {},
  }) => produce(state, draft => {
    const pagination = draft.paginations[key] || getDefaultPagination();
    pagination.loading = true;

    draft.paginations[key] = pagination;
  }),

  [AsyncActionStatus.SUCCESS]: (state: IPaginatableState<S>, {
    payload,
    meta: { key = DEFAULT_PAGINATION_KEY } = {},
  }: IAction<any>) => produce(state, draft => {
    const pagination = draft.paginations[key] || getDefaultPagination();

    pagination.loading = false;

    if (!payload) return;

    const pkKey = options.getPkKey(payload);
    draft.data[pkKey] = payload;

    draft.paginations[key] = pagination;
  }),

  [AsyncActionStatus.FAILURE]: (state: IPaginatableState<S>, {
    payload, // eslint-disable-line no-unused-vars
    meta: { key = DEFAULT_PAGINATION_KEY } = { key: DEFAULT_PAGINATION_KEY },
  }: IAction<any>) => produce(state, draft => {
    const pagination = draft.paginations[key] || getDefaultPagination();
    pagination.loading = false;

    draft.paginations[key] = pagination;
  }),
});

export const createPaginationReducers = <S>(
  types: ICreateReducerTypes,
  options: ICreateReducerOptions<S> = {}
) => {
  const opts = {
    getPkKey: defaultGetPkKey,
    transform: identity,
    ...options,
  };

  return {
    ...createAsyncActionHandlers(types.list, listActionHandlers<S>(opts)),
    ...createAsyncActionHandlers(types.update, updateActionHandlers<S>(opts)),
  };
};
