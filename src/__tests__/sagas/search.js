import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import api from 'services/api';
import rootSaga from 'store/sagas';
import SearchActions from 'store/ducks/search';
import LoaderActions from 'store/ducks/loader';
import DetailsCardActions from 'store/ducks/detailsCard';
import SearchByTypeActions from 'store/ducks/searchByType';

const pokemonFixture = require('./fixtures/pokemon.json');
const typeFixture = require('./fixtures/type.json');

describe('Testing the saga of searching for pokemons', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it('can search by name', async () => {
    apiMock.onGet('pokemon/bulbasaur')
      .reply(200, pokemonFixture.bulbasaur);

    sagaTester.dispatch(SearchActions.searchRequest('bulbasaur'));

    await sagaTester.waitFor(SearchActions.searchSuccess().type);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1].type).toEqual(SearchActions.searchSuccess().type);
    expect(calledActions[1].data.name).toEqual(pokemonFixture.bulbasaur.name);
    expect(calledActions[2].type).toEqual(DetailsCardActions.detailsCardOpen().type);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(LoaderActions.loaderLoadingOff());
  });

  it('can search by id', async () => {
    apiMock.onGet('pokemon/2')
      .reply(200, pokemonFixture.bulbasaur);

    sagaTester.dispatch(SearchActions.searchRequest(2));

    await sagaTester.waitFor(SearchActions.searchSuccess(pokemonFixture.bulbasaur).type);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1].type).toEqual(SearchActions.searchSuccess().type);
    expect(calledActions[1].data.name).toEqual(pokemonFixture.bulbasaur.name);
    expect(calledActions[2].type).toEqual(DetailsCardActions.detailsCardOpen().type);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(LoaderActions.loaderLoadingOff());
  });

  it('search should delivery failure', async () => {
    apiMock.onGet('pokemon/whatevernotfound')
      .reply(400);

    sagaTester.dispatch(SearchActions.searchRequest('whatevernotfound'));

    await sagaTester.waitFor(SearchActions.searchFailure().type);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1].type).toEqual(SearchActions.searchFailure().type);
  });

  it('can search by type', async () => {
    apiMock.onGet('type/poison')
      .reply(200, typeFixture.poison);

    sagaTester.dispatch(SearchByTypeActions.searchByTypeRequest('poison'));

    await sagaTester.waitFor(SearchByTypeActions.searchByTypeSuccess().type);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1].type).toEqual(SearchByTypeActions.searchByTypeSuccess().type);
    expect(calledActions[1].data.name).toEqual(typeFixture.poison.name);
    expect(calledActions[2].type).toEqual(DetailsCardActions.detailsCardClose().type);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(LoaderActions.loaderLoadingOff());
  });
});
