import { put, takeEvery, call, take, race } from "redux-saga/effects";
import { SEARCH_UPDATE_INPUT, updateSearchSuggestions } from 'components/search/actions';
import request from 'api';

const fetchSuggestions = (data) => {
  return request.getSuggestions(data)
}

function* updateSuggestions(action) {
    const { payload } = action;

    if (payload.length) {
        const { suggestions } = yield race({
            suggestions: call(fetchSuggestions, {q: payload}),
            cancel: take(SEARCH_UPDATE_INPUT)
        });

        if (suggestions) {
            yield put(updateSearchSuggestions(suggestions.data.categories))
        }
        else {
            console.log('no match');
        }
    } else {
        yield put(updateSearchSuggestions([]))
    }
}

export default function* watchSearchSuggestions() {
  yield takeEvery(SEARCH_UPDATE_INPUT, updateSuggestions);
}