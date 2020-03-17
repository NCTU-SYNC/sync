import { ASYNC_TYPES } from '~/constants/actionTypes';
import axios from 'axios';

export const listNews = (data: any) => {
  return async (dispatch: any) => {
    dispatch({type: ASYNC_TYPES.LIST_NEWS.REQUEST});
  
    try {
      let res: any = await axios.get(`${process.env.API_URL}/news?`, data);
      dispatch({type: ASYNC_TYPES.LIST_NEWS.SUCCESS, payload: res});
      return res;
    } catch (error) {
      dispatch({type: ASYNC_TYPES.LIST_NEWS.FAILURE, error});
      return error;
    }
  };
};
