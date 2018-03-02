import { all, takeLatest } from 'redux-saga/effects';

/* Types */
import { Types as SearchTypes } from 'store/ducks/search';
import { Types as SearchByTypeTypes } from 'store/ducks/searchByType';
import { Types as AddPokemonTypes } from 'store/ducks/addPokemon';
import { Types as RemovePokemonTypes } from 'store/ducks/removePokemon';
import { Types as PokedexTypes } from 'store/ducks/pokedex';

/* Sagas */
import { searchByNameOrId, searchAllByType } from './search';
// import { addOrUpdatePokemon, isPokemonInPokedex, isPokemonListInPokedex, removePokemon } from './pokemon';
import { addOrUpdatePokemon, isPokemonInPokedex, removePokemon } from './pokemon';

export default function* root() {
  yield all([
    takeLatest(SearchTypes.SEARCH_REQUEST, searchByNameOrId),
    takeLatest(SearchByTypeTypes.SEARCH_BY_TYPE_REQUEST, searchAllByType),
    takeLatest(AddPokemonTypes.ADD_POKEMON_REQUEST, addOrUpdatePokemon),
    takeLatest(RemovePokemonTypes.REMOVE_POKEMON_REQUEST, removePokemon),
    takeLatest(PokedexTypes.POKEDEX_REQUEST, isPokemonInPokedex),
    // takeLatest(PokedexTypes.POKEDEX_REQUEST_LIST, isPokemonListInPokedex),
  ]);
}
