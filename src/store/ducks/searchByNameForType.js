import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  searchByNameForTypeRequest: ['pokemon'],
  searchByNameForTypeSuccess: ['data'],
  searchByNameForTypeFailure: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  data: [],
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
  data: [
    {
      name: action.data.name,
      image: action.data.sprites.front_default,
    },
    ...state.data],
  loading: false,
  error: false,
});

export const failure = state => ({
  ...state,
  loading: false,
  error: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_BY_NAME_FOR_TYPE_REQUEST]: request,
  [Types.SEARCH_BY_NAME_FOR_TYPE_SUCCESS]: success,
  [Types.SEARCH_BY_NAME_FOR_TYPE_FAILURE]: failure,
});
