import { combineEpics } from 'redux-observable';
import aritcleEpic from '~/modules/article/epic';

export default combineEpics(
  ...aritcleEpic,
);
