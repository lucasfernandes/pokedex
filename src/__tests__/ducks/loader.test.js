import LoaderActions, { reducer } from 'store/ducks/loader';

const INITIAL_STATE = {
  loading: false,
};

const LOADING_ON_STATE = {
  loading: true,
};

describe('Testing loader', () => {
  it('can request to turn loader ON', () => {
    const state = reducer(INITIAL_STATE, LoaderActions.loaderLoadingOn());

    expect(state.loading).toBe(true);
  });

  it('can request to turn loader OFF', () => {
    const state = reducer(LOADING_ON_STATE, LoaderActions.loaderLoadingOff());

    expect(state.loading).toBe(false);
  });

  it('loading should false when loader is called with a wrong action', () => {
    const state = reducer(undefined, {});

    expect(state.loading).toBe(false);
  });
});
