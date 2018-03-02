import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  pokedexRequest: ['pokemon'],
  pokedexSuccess: ['saved'],
  pokedexFailure: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  saved: false,
  loading: false,
  error: false,
};

/* Reducers */

export const request = state => ({
  ...state,
  loading: true,
  error: false,
});

export const success = (state, action) => ({
  ...state,
  saved: action.saved,
  loading: false,
  error: false,
});

export const failure = state => ({
  ...state,
  loading: false,
  error: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POKEDEX_REQUEST]: request,
  [Types.POKEDEX_SUCCESS]: success,
  [Types.POKEDEX_FAILURE]: failure,
});
