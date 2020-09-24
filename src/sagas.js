import { all } from "redux-saga/effects";
import watchSearchSuggestions from 'components/search/saga';

export function* rootSagas() {
  yield all([
    watchSearchSuggestions(),
  ]);
}