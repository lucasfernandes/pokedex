import api from 'services/api';
import firebase from 'config/FirebaseConfig';

import { call, put } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/search';
import DetailsCardActionCreators from 'store/ducks/detailsCard';

const rootRef = firebase.database().ref();
const pokemonsRef = rootRef.child('pokemons');

function* checkIsInPokedex(pokemonName) {
  const pokemonById = pokemonsRef
    .orderByChild('name')
    .equalTo(pokemonName);

  return yield call([pokemonById, pokemonById.once], 'value');
}

export function* searchByNameOrId(action) {
  const response = yield call(api.get, `pokemon/${action.pokemon}`);

  if (response.ok) {
    try {
      const pokemonName = response.data.name;
      const result = yield call(checkIsInPokedex, pokemonName);
      const pokedex = result.val() ? result.val()[1] : false;

      yield put(ActionCreators.searchSuccess(response.data, pokedex));
      yield put(DetailsCardActionCreators.detailsCardOpen());
    } catch (error) {
      yield put(ActionCreators.searchFailure());
    }
  } else {
    yield put(ActionCreators.searchFailure());
  }
}
