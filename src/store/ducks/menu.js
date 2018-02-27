import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  menuOpen: null,
  menuClose: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  opened: false,
};

/* Reducers */

export const open = () => ({
  opened: true,
});

export const close = () => ({
  opened: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MENU_OPEN]: open,
  [Types.MENU_CLOSE]: close,
});
