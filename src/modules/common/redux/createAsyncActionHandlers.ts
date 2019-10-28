import { IAsyncActionType } from '~/constants/actionTypes';

const createAsyncActionHandlers = (
  types: IAsyncActionType[] = [],
  handlers: Record<string, (...args: any[]) => any>
) => (
  types.reduce((actions, types) => Object
    .keys(types)
    .reduce((res, key) => ({
      ...res,
      [(types as any)[key]]: handlers[key],
    }), actions), {})
);

export default createAsyncActionHandlers;
