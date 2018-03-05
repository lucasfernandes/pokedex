import SearchActions, { reducer } from 'store/ducks/search';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  inPokedex: false,
};

const pokemonFixture = require('__tests__/sagas/fixtures/pokemon.json');

const LOADED_STATE = {
  data: pokemonFixture.bulbasaur,
  loading: false,
  error: false,
  inPokedex: false,
};

describe('Testing Search', () => {
  it('can request a pokemon search by name', () => {
    const state = reducer(INITIAL_STATE, SearchActions.searchRequest('bulbasaur'));

    expect(state.loading).toBe(true);
  });

  it('should successfully receive pokemon data', () => {
    const state = reducer([], SearchActions.searchSuccess(LOADED_STATE));

    expect(state.data.data).toEqual(LOADED_STATE.data);
  });

  it('should return failure when a pokemon was not found', () => {
    const state = reducer([], SearchActions.searchFailure());

    expect(state.error).toBe(true);
  });
});
