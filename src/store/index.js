import { combineReducers } from 'redux';

/* Reducers */
import { reducer as search } from './ducks/search';
import { reducer as searchByType } from './ducks/searchByType';
import { reducer as searchByNameForType } from './ducks/searchByNameForType';
import { reducer as detailsCard } from './ducks/detailsCard';
import { reducer as loader } from './ducks/loader';
import { reducer as addPokemon } from './ducks/addPokemon';
import { reducer as removePokemon } from './ducks/removePokemon';
import { reducer as pokedex } from './ducks/pokedex';
import { reducer as list } from './ducks/list';

import configureStore from './configureStore';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  search,
  searchByType,
  searchByNameForType,
  detailsCard,
  loader,
  addPokemon,
  removePokemon,
  pokedex,
  list,
});

const store = configureStore(rootReducer, rootSaga);

export default store;

