import { createAction } from 'redux-actions';
import { ASYNC_TYPES } from '~/constants/actionTypes';
import axios from 'axios';
import { IAritcle } from '~/modules/article/reducer';

export const updateArticle = createAction(
  ASYNC_TYPES.UPDATE_ARTICLE.REQUEST,
  (payload: { _id: string, title: string; tags: string[]; blocks: string; entityMap: string }) => payload,
);

export const listArticle2 = (data: any) => {
  return async (dispatch: any) => {
    dispatch({type: ASYNC_TYPES.LIST_ARTICLE.REQUEST});

    try {
      let res: any = await axios.get(`${process.env.API_URL}/article?`, data as any);
      dispatch({type: ASYNC_TYPES.LIST_ARTICLE.SUCCESS, payload :res.data.data});
      return res;
    } catch (error) {
      dispatch({type: ASYNC_TYPES.LIST_ARTICLE.FAILURE, error});
      return error;
    }
  };
};

export const createArticle = (data: any) => {
  return async (dispatch: any) => {
    dispatch({type: ASYNC_TYPES.CREATE_ARTICLE.REQUEST});

    try {
      let res: any = await axios.post(`${process.env.API_URL}/article`, data as IAritcle);
      dispatch({type: ASYNC_TYPES.CREATE_ARTICLE.SUCCESS, payload: res.data.data});
      return res;
    } catch (error) {
      dispatch({type: ASYNC_TYPES.CREATE_ARTICLE.FAILURE, error});
      return error;
    }
  };
};
