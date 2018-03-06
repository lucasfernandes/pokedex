import api from 'services/api';

import { call, put, all } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/search';
import SearchByTypeActionCreators from 'store/ducks/searchByType';
import SearchByNameForTypeActionCreators from 'store/ducks/searchByNameForType';
import DetailsCardActionCreators from 'store/ducks/detailsCard';
import LoaderActionCreators from 'store/ducks/loader';
import firebase from 'config/FirebaseConfig';
import { notify } from 'react-notify-toast';

const rootRef = firebase.database().ref();
const pokemonsRef = rootRef.child('pokemons');

async function getShortEffect(name) {
  const response = await api.get(`ability/${name}`);
  return response.data;
}

function* getAllShortEffectsFromAbilities(abilities) {
  const abilitiesValues = Object.values(abilities);

  const shortEffectsList = yield all(abilitiesValues.map(item =>
    call(getShortEffect, item.ability.name)));

  return shortEffectsList;
}

export function* searchByNameOrId(action) {
  // Get a pokemon from API
  const response = yield call(api.get, `pokemon/${action.pokemon}`);
  let inPokedex = false;

  if (response.ok) {
    const { data } = response;

    try {
      // Check did save a different image on Firebase
      const singlePokemonRef = pokemonsRef.orderByChild('name').equalTo(data.name);
      const result = yield call([singlePokemonRef, singlePokemonRef.once], 'value');

      if (result.val() !== null) {
        inPokedex = true;

        const image = Object.values(result.val()).map(item => (
          item.image !== data.sprites.front_default && item.image
        ))[0];

        if (image !== false) data.sprites.front_default = image;
      }

      // Get short_effect to compose needed info
      const { abilities } = data;
      const shortEffectsList = yield call(getAllShortEffectsFromAbilities, abilities);
      data.short_effects = shortEffectsList;

      yield put(ActionCreators.searchSuccess(data, inPokedex));
      yield put(DetailsCardActionCreators.detailsCardOpen());
    } catch (error) {
      yield put(ActionCreators.searchFailure());
      notify.show('Something went wrong, pokemon not found!', 'error', 3000);
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
    notify.show(`Something went wrong on loading ${action.typeName} pokemons`, 'error', 3000);
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
    yield put(SearchByNameForTypeActionCreators.searchByNameForTypeFailure());
  }
}

// async function getSpeciesFromPokemon(name) {
//   const response = await api.get(`pokemon-species/${name}`);
//   return response.data;
// }

// async function asyncGet(url, param) {
//   const response = await api.get(`${url}/${param}`);
//   return response.data;
// }

// function* getEvolutionChain(pokemon) {
//   const resultSpecies = yield call(api.get, `pokemon-species/${pokemon}`);
//   if (!resultSpecies.ok) return null;

//   const { url } = resultSpecies.data.evolution_chain;
//   const { evolves_from_species: { name: evolvesFrom } } = resultSpecies.data;

//   const chain = {};
//   chain.evolvesFrom = evolvesFrom;

// console.log(chain);

// const chainId = url.replace(/[^0-9]/g, '').substring(1, url.length + 1);
// const resultChain = yield call(api.get, `evolution-chain/${chainId}`);

// if (!resultChain.ok) return null;
// const { data } = resultChain;

// if (data.chain.species.name === pokemon) {
//   chain.evolvesTo = null;
// } else {
//   const { evolves_to: evolvesTo } = data.chain;

//   if (evolvesTo.length > 0) {
//     console.log(evolvesTo.species.name);
//     console.log(pokemon);
//   }
// }

// console.log(chain);

//   return chain;
// }