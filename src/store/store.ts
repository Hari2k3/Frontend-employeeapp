
// import { legacy_createStore as createStore } from "redux";
// import employeeReducer from "./employee/employeeReducer";
// import { legacy_createStore as createStore, applyMiddleware } from "redux";

// import logger from "redux-logger";

// const employeestore = createStore(
//   employeeReducer,
//   undefined,
//   applyMiddleware(logger)
// );
// // const employeestore = createStore(employeeReducer)
// export default employeestore;
// import { createStore,combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employee/employeeReducer";
import { useDispatch, useSelector } from "react-redux";
import baseApi from "../api-services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const store= configureStore({
  reducer: {
    employee: employeeReducer,
    [baseApi.reducerPath]:baseApi.reducer
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(baseApi.middleware)
})
setupListeners(store.dispatch);
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector<RootState, any>
