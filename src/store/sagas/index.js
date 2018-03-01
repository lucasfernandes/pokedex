import { all, takeLatest } from 'redux-saga/effects';

/* Types */
import { Types as SearchTypes } from 'store/ducks/search';
import { Types as AddPokemonTypes } from 'store/ducks/addPokemon';

/* Sagas */
import { searchByNameOrId } from './search';
import { addOrUpdatePokemon } from './pokemon';

export default function* root() {
  yield all([
    takeLatest(SearchTypes.SEARCH_REQUEST, searchByNameOrId),
    takeLatest(AddPokemonTypes.ADD_POKEMON_REQUEST, addOrUpdatePokemon),
  ]);
}
