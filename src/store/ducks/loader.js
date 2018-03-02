import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  loaderLoadingOn: null,
  loaderLoadingOff: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  loading: false,
};

/* Reducers */

export const loadingOn = () => ({
  loading: true,
});

export const loadingOff = () => ({
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOADER_LOADING_ON]: loadingOn,
  [Types.LOADER_LOADING_OFF]: loadingOff,
});
