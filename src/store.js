import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSagas } from "./sagas";
import mainReducer from "./mainReducer";


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSagas);
