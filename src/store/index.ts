import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import textEditorReducer from "./textEditor/slice";

const persistedTextEditorReducer = persistReducer(
  {
    key: "textEditor",
    storage,
  },
  textEditorReducer
);

export const store = configureStore({
  reducer: {
    textEditor: persistedTextEditorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof store.getState>;
