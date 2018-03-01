import { createActions, createReducer } from 'reduxsauce';

/* Types & Creators */

const { Types, Creators } = createActions({
  detailsCardOpen: null,
  detailsCardClose: null,
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  open: false,
};

/* Reducers */

export const open = () => ({
  open: true,
});

export const close = () => ({
  open: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DETAILS_CARD_OPEN]: open,
  [Types.DETAILS_CARD_CLOSE]: close,
});
