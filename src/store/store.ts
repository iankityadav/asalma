import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

import { apiSlice } from "./services/api.slice";
import { employeeApi } from "./employee/employee.endpoint";
import { assetApi } from "./assets/assets.endpoint";

const rootReducer: Reducer = combineReducers({
  [employeeApi.reducerPath]: employeeApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => string | any[]) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(employeeApi.middleware, assetApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
