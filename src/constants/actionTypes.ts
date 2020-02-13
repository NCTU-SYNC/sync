
export enum AsyncActionStatus {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}
export type IAsyncActionType  = Record<AsyncActionStatus, string>;
export type IAsyncActionTypes = Record<string, IAsyncActionType>;

enum ASYNC_ACTION_TYPES {
  LIST_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
}

const asyncActionFactory = (types: object): IAsyncActionTypes => (
  Object.keys(types).reduce((acc, type) => ({
    ...acc,
    [type]: {
      [AsyncActionStatus.REQUEST]: `${type}/${AsyncActionStatus.REQUEST}`,
      [AsyncActionStatus.SUCCESS]: `${type}/${AsyncActionStatus.SUCCESS}`,
      [AsyncActionStatus.FAILURE]: `${type}/${AsyncActionStatus.FAILURE}`,
    } as IAsyncActionType,
  }), {})
);

export const ASYNC_TYPES = asyncActionFactory(ASYNC_ACTION_TYPES);
