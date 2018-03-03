import api from 'services/api';

import { call, put, all } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/search';
import SearchByTypeActionCreators from 'store/ducks/searchByType';
import DetailsCardActionCreators from 'store/ducks/detailsCard';
import LoaderActionCreators from 'store/ducks/loader';
import firebase from 'config/FirebaseConfig';

const rootRef = firebase.database().ref();
const pokemonsRef = rootRef.child('pokemons');

function* checkIsInPokedex(pokemonName) {
  const pokemonByName = pokemonsRef
    .orderByChild('name')
    .equalTo(pokemonName);

  return yield call([pokemonByName, pokemonByName.once], 'value');
}

export function* searchByNameOrId(action) {
  const response = yield call(api.get, `pokemon/${action.pokemon}`);

  if (response.ok) {
    try {

      const result = yield call(checkIsInPokedex, response.data.name);
      const pokemon = result.val()[1];

      if (pokemon !== null &&
          pokemon.image !== response.data.sprites.front_default) {
        response.data.sprites.front_default = pokemon.image;
      }

      yield put(ActionCreators.searchSuccess(response.data));
      yield put(DetailsCardActionCreators.detailsCardOpen());
    } catch (error) {
      console.tron.log(error.message);
      yield put(ActionCreators.searchFailure());
    }
  } else {
    yield put(ActionCreators.searchFailure());
  }

  yield put(LoaderActionCreators.loaderLoadingOff());
}

async function getPokemonData(name) {
  const response = await api.get(`pokemon/${name}`);
  return response.data;
}

function* getAllByNameFromApi(pokemons) {
  const pokemonValues = Object.values(pokemons);

  const pokemonsList = yield all(pokemonValues.map(item =>
    call(getPokemonData, item.pokemon.name)));

  return pokemonsList;
}

export function* searchAllByType(action) {
  const response = yield call(api.get, `type/${action.typeName}`);

  if (response.ok) {
    const pokemons = response.data.pokemon;

    try {
      const pokemonsList = yield call(getAllByNameFromApi, pokemons);
      console.tron.log(pokemonsList);
      yield put(SearchByTypeActionCreators.searchByTypeSuccess(action.typeName, pokemonsList));
    } catch (error) {
      console.tron.log(error.message);
      yield put(SearchByTypeActionCreators.searchByTypeFailure());
    }
  } else {
    yield put(SearchByTypeActionCreators.searchByTypeFailure());
  }

  yield put(LoaderActionCreators.loaderLoadingOff());
}
