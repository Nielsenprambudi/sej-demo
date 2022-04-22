import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/category";

export const rootReducer = combineReducers({
    categories: categoryReducer
})