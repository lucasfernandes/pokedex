import { call, put } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/addPokemon';
import firebase from 'config/FirebaseConfig';

const rootRef = firebase.database().ref();
const pokemonsRef = rootRef.child('pokemons');

export function* addOrUpdatePokemon(action) {
  const values = { ...action };
  delete values.type;

  const pokemon = { [action.id]: values };

  try {
    yield call([pokemonsRef, pokemonsRef.update], pokemon);
    yield put(ActionCreators.addPokemonSuccess());
  } catch (error) {
    yield put(ActionCreators.addPokemonFailure());
  }
}
