import api from 'services/api';
// import firebase from 'config/FirebaseConfig';

import { call, put, all } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/search';
import SearchByTypeActionCreators from 'store/ducks/searchByType';
import DetailsCardActionCreators from 'store/ducks/detailsCard';
import LoaderActionCreators from 'store/ducks/loader';

// const rootRef = firebase.database().ref();
// const pokemonsRef = rootRef.child('pokemons');

// function* checkIsInPokedex(pokemonName) {
//   const pokemonById = pokemonsRef
//     .orderByChild('name')
//     .equalTo(pokemonName);

//   return yield call([pokemonById, pokemonById.once], 'value');
// }

export function* searchByNameOrId(action) {
  const response = yield call(api.get, `pokemon/${action.pokemon}`);

  if (response.ok) {
    try {
      // const pokemonName = response.data.name;
      // const result = yield call(checkIsInPokedex, pokemonName);
      // const pokedex = result.val() ? result.val()[1] : false;

      // yield put(ActionCreators.searchSuccess(response.data, pokedex));
      yield put(ActionCreators.searchSuccess(response.data));
      yield put(DetailsCardActionCreators.detailsCardOpen());
    } catch (error) {
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
