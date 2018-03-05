import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  listAdd: ['pokemons'],
  listRemove: ['pokemon'],
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  pokemonsList: [],
};

/* Reducers */

export const add = (state, action) => ({
  ...state,
  pokemonsList: Object.values(action.pokemons),
});

export const remove = (state, action) => ({
  ...state,
  pokemonsList: Object.values(state.pokemonsList)
    .filter(pokemon => pokemon.name !== action.pokemon),
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_ADD]: add,
  [Types.LIST_REMOVE]: remove,
});
