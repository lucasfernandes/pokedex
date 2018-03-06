import { call, put } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/addPokemon';
import RemovePokemonActionCreators from 'store/ducks/removePokemon';
import ListActionCreators from 'store/ducks/list';
import PokedexActionCreators from 'store/ducks/pokedex';
import LoaderActionCreators from 'store/ducks/loader';
import firebase from 'config/FirebaseConfig';
import { notify } from 'react-notify-toast';

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
    notify.show('Pokemon catched!', 'success', 3000);
  } catch (error) {
    yield put(ActionCreators.addPokemonFailure());
    notify.show('Something went wrong, pokemon was not catched!', 'error', 3000);
  }

  yield put(LoaderActionCreators.loaderLoadingOff());
}

export function* removePokemon(action) {
  try {
    const pokemonToRemove = pokemonsRef.child(action.id);

    yield call([pokemonToRemove, pokemonToRemove.remove]);
    yield put(RemovePokemonActionCreators.removePokemonSuccess());
    yield put(ListActionCreators.listRemove(action.name));
    yield put(PokedexActionCreators.pokedexRequest(action.name));
    notify.show('Pokemon released!', 'success', 3000);
  } catch (error) {
    yield put(RemovePokemonActionCreators.removePokemonFailure());
    notify.show('Something went wrong, pokemon was not released', 'error', 3000);
  }

  yield put(LoaderActionCreators.loaderLoadingOff());
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

