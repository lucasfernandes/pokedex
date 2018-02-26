import { combineReducers } from 'redux';

/* Reducers */
import { reducer as search } from './ducks/search';

import configureStore from './configureStore';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  search,
});

const store = configureStore(rootReducer, rootSaga);

export default store;

