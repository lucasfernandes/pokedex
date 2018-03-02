import { combineReducers } from 'redux';

/* Reducers */
import { reducer as search } from './ducks/search';
import { reducer as searchByType } from './ducks/searchByType';
import { reducer as detailsCard } from './ducks/detailsCard';
import { reducer as loader } from './ducks/loader';
import { reducer as addPokemon } from './ducks/addPokemon';
import { reducer as removePokemon } from './ducks/removePokemon';
import { reducer as pokedex } from './ducks/pokedex';

import configureStore from './configureStore';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  search,
  searchByType,
  detailsCard,
  loader,
  addPokemon,
  removePokemon,
  pokedex,
});

const store = configureStore(rootReducer, rootSaga);

export default store;

