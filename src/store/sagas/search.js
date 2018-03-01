// import api from '../../services/api';
import api from 'services/api';

import { call, put } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/search';
import DetailsCardActionCreators from 'store/ducks/detailsCard';

export function* searchByNameOrId(action) {
  const response = yield call(api.get, `pokemon/${action.pokemon}`);

  if (response.ok) {
    yield put(ActionCreators.searchSuccess(response.data));
    yield put(DetailsCardActionCreators.detailsCardOpen());
  } else {
    yield put(ActionCreators.searchFailure());
  }
}
