import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  addPokemonRequest: ['id', 'name', 'image'],
  addPokemonSuccess: null,
  addPokemonFailure: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  loading: false,
  error: false,
};

/* Reducers */

export const request = state => ({
  ...state,
  loading: true,
  error: false,
});

export const success = state => ({
  ...state,
  loading: false,
  error: false,
});

export const failure = state => ({
  ...state,
  loading: false,
  error: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_POKEMON_REQUEST]: request,
  [Types.ADD_POKEMON_SUCCESS]: success,
  [Types.ADD_POKEMON_FAILURE]: failure,
});
