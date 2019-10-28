import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers, { IState } from './reducers';
import epics from './epics';
import { IAction } from './pagination';

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware<IAction, IAction, IState>();
  const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(epicMiddleware)
  ));

  epicMiddleware.run(epics);

  return store;
}
