import { ASYNC_TYPES } from '~/constants/actionTypes';
import axios from 'axios';

import { getPaginationKey } from '~/modules/common/redux/getPaginationKey';

export const listNews = (data: any) => {
  const paginationKey = getPaginationKey({
    ...data.q && {q: data.q}
  });

  return async (dispatch: any) => {
    dispatch({type: ASYNC_TYPES.LIST_NEWS.REQUEST, meta: {key: paginationKey}});
  
    try {
      let res: any = await axios.get(`${process.env.API_URL}/news?`, data);
      dispatch({type: ASYNC_TYPES.LIST_NEWS.SUCCESS, payload: res.data.data, meta: {key: paginationKey}});
      return res;
    } catch (error) {
      dispatch({type: ASYNC_TYPES.LIST_NEWS.FAILURE, error});
      return error;
    }
  };
};
