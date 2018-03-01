import { combineReducers } from 'redux';

/* Reducers */
import { reducer as search } from './ducks/search';
import { reducer as detailsCard } from './ducks/detailsCard';

import configureStore from './configureStore';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  search,
  detailsCard,
});

const store = configureStore(rootReducer, rootSaga);

export default store;

