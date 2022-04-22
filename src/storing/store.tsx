import reducer from "./reducers/category";
import promiseMiddleware from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from 'redux-logger';


const rootReducer = combineReducers({
    config: reducer
    // config: null
});

const persistConfig = {
    key: "SEJ-DEMO",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = () => {
    const store = createStore(
      persistedReducer,
      applyMiddleware(promiseMiddleware, logger),
    );
    const persistor = persistStore(store);
    return {store, persistor};
  };

  export default store;