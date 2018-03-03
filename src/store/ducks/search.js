import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  searchRequest: ['pokemon'],
  searchSuccess: ['data', 'inPokedex'],
  searchFailure: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  inPokedex: false,
};

/* Reducers */

export const request = state => ({
  ...state,
  loading: true,
  error: false,
});

export const success = (state, action) => ({
  ...state,
  data: action.data,
  loading: false,
  error: false,
  inPokedex: action.inPokedex,
});

export const failure = state => ({
  ...state,
  loading: false,
  error: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: request,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure,
});
