// import api from '../../services/api';
import api from 'services/api';

import { call, put } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/search';

export function* searchByNameOrId(action) {
  const response = yield call(api.get, `pokemon/${action.pokemon}`);

  if (response.ok) {
    // console.tron.log(response.data);
    yield put(ActionCreators.searchSuccess(response.data));
  } else {
    yield put(ActionCreators.searchFailure());
  }
}
