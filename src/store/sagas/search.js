import api from 'services/api';

import { call, put, all } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/search';
import SearchByTypeActionCreators from 'store/ducks/searchByType';
import SearchByNameForTypeActionCreators from 'store/ducks/searchByNameForType';
import DetailsCardActionCreators from 'store/ducks/detailsCard';
import LoaderActionCreators from 'store/ducks/loader';
import firebase from 'config/FirebaseConfig';

const rootRef = firebase.database().ref();
const pokemonsRef = rootRef.child('pokemons');

export function* searchByNameOrId(action) {
  const response = yield call(api.get, `pokemon/${action.pokemon}`);
  let inPokedex = false;

  if (response.ok) {
    try {
      const singlePokemonRef = pokemonsRef.orderByChild('name').equalTo(response.data.name);
      const result = yield call([singlePokemonRef, singlePokemonRef.once], 'value');

      if (result.val() !== null) {
        inPokedex = true;

        const image = Object.values(result.val()).map(item => (
          item.image !== response.data.sprites.front_default && item.image
        ))[0];

        if (image !== false) response.data.sprites.front_default = image;
      }

      yield put(ActionCreators.searchSuccess(response.data, inPokedex));
      yield put(DetailsCardActionCreators.detailsCardOpen());
    } catch (error) {
      yield put(ActionCreators.searchFailure());
    }
  } else {
    yield put(ActionCreators.searchFailure());
  }

  yield put(LoaderActionCreators.loaderLoadingOff());
}

export function* searchAllByType(action) {
  const response = yield call(api.get, `type/${action.typeName}`);

  if (response.ok) {
    yield put(SearchByTypeActionCreators.searchByTypeSuccess(response.data, action.typeName));
    yield put(DetailsCardActionCreators.detailsCardClose());
  } else {
    yield put(SearchByTypeActionCreators.searchByTypeFailure());
  }

  yield put(LoaderActionCreators.loaderLoadingOff());
}

export function* searchByNameForType(action) {
  try {
    const response = yield call(api.get, `pokemon/${action.pokemon}`);
    if (response.ok) {
      yield put(SearchByNameForTypeActionCreators.searchByNameForTypeSuccess(response.data));
    } else {
      yield put(SearchByNameForTypeActionCreators.searchByNameForTypeFailure());
    }
  } catch (error) {
    console.tron.log(error.message);
  }
}

/*  GET EVERYONE BUT TAKES TO MUCH TIME */

// async function getPokemonData(name) {
//   const response = await api.get(`pokemon/${name}`);
//   return response.data;
// }

// function* getAllByNameFromApi(pokemons) {
//   const pokemonValues = Object.values(pokemons);

//   const pokemonsList = yield all(pokemonValues.map(item =>
//     call(getPokemonData, item.pokemon.name)));

//   return pokemonsList;
// }


// export function* searchAllByType(action) {
//   const response = yield call(api.get, `type/${action.typeName}`);

//   if (response.ok) {
//     const pokemons = response.data.pokemon;

//     try {
//       const pokemonsList = yield call(getAllByNameFromApi, pokemons);
//       console.tron.log(pokemonsList);
//       yield put(SearchByTypeActionCreators.searchByTypeSuccess(action.typeName, pokemonsList));
//     } catch (error) {
//       console.tron.log(error.message);
//       yield put(SearchByTypeActionCreators.searchByTypeFailure());
//     }
//   } else {
//     yield put(SearchByTypeActionCreators.searchByTypeFailure());
//   }

//   yield put(LoaderActionCreators.loaderLoadingOff());
// }
