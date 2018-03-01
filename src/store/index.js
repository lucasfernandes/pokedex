import { combineReducers } from 'redux';

/* Reducers */
import { reducer as search } from './ducks/search';
import { reducer as detailsCard } from './ducks/detailsCard';
import { reducer as addPokemon } from './ducks/addPokemon';

import configureStore from './configureStore';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  search,
  detailsCard,
  addPokemon,
});

const store = configureStore(rootReducer, rootSaga);

export default store;

