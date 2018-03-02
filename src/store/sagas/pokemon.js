import { call, put } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/addPokemon';
import RemovePokemonActionCreators from 'store/ducks/removePokemon';
import PokedexActionCreators from 'store/ducks/pokedex';
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
    yield put(PokedexActionCreators.pokedexRequest(action.name));
  } catch (error) {
    yield put(ActionCreators.addPokemonFailure());
  }
}

export function* removePokemon(action) {
  try {
    const pokemonToRemove = pokemonsRef.child(action.id);

    yield call([pokemonToRemove, pokemonToRemove.remove]);
    yield put(RemovePokemonActionCreators.removePokemonSuccess());
    yield put(PokedexActionCreators.pokedexRequest(action.name));
  } catch (error) {
    yield put(RemovePokemonActionCreators.removePokemonFailure());
  }
}

function* checkIsInPokedex(pokemonName) {
  const pokemonByName = pokemonsRef
    .orderByChild('name')
    .equalTo(pokemonName);

  return yield call([pokemonByName, pokemonByName.once], 'value');
}

export function* isPokemonInPokedex(action) {
  try {
    const pokemonName = action.pokemon;
    const result = yield call(checkIsInPokedex, pokemonName);
    const saved = !!result.val();

    yield put(PokedexActionCreators.pokedexSuccess(saved));
  } catch (error) {
    yield put(PokedexActionCreators.pokedexFailure());
  }
}
