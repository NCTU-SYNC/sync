import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import epics from './epics';

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(epicMiddleware)
  ));

  epicMiddleware.run(epics);

  return store;
}