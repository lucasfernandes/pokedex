import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  searchByTypeRequest: ['typeName'],
  // searchByTypeSuccess: ['typeName', 'data', 'saved'],
  searchByTypeSuccess: ['data', 'typeName'],
  searchByTypeFailure: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  typeName: '',
  data: {},
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
  typeName: action.typeName,
  data: action.data,
  loading: false,
  error: false,
});

export const failure = state => ({
  ...state,
  loading: false,
  error: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_BY_TYPE_REQUEST]: request,
  [Types.SEARCH_BY_TYPE_SUCCESS]: success,
  [Types.SEARCH_BY_TYPE_FAILURE]: failure,
});
