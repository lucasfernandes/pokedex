import { all, takeLatest } from 'redux-saga/effects';

/* Types */
import { Types as SearchTypes } from 'store/ducks/search';

/* Sagas */
import { searchByNameOrId } from './search';

export default function* root() {
  yield all([
    takeLatest(SearchTypes.SEARCH_REQUEST, searchByNameOrId),
  ]);
}
