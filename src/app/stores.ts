import { persistReducer } from "redux-persist";
import { persistStore as createPersistStore } from "redux-persist";
import storage from "redux-persist/es/storage"; // defaults to localStorage for web
import { usersAPI } from "../features/auth/usersAPI";
import { bugsProjectsCommentsAPI } from "../features/api/bugsProjectsCommentsAPI";
import authReducer from "../features/auth/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [bugsProjectsCommentsAPI.reducerPath]: bugsProjectsCommentsAPI.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersAPI.middleware)
      .concat(bugsProjectsCommentsAPI.middleware),
});

export const persistor = createPersistStore(store);
export const persistStore = persistor;
export type RootState = ReturnType<typeof store.getState>;