import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "state/api";
import { stockApi } from "services/stockApi";
import { stockDetailApi } from "services/stockDetailApi";
import { stockNewsApi } from "services/stockNewsApi";
import { stockHistoryApi } from "services/stockHistoryApi";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [stockDetailApi.reducerPath]: stockDetailApi.reducer,
    [stockNewsApi.reducerPath]: stockNewsApi.reducer,
    [stockHistoryApi.reducerPath]: stockHistoryApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(
      api.middleware,
      stockApi.middleware,
      stockDetailApi.middleware,
      stockNewsApi.middleware,
      stockHistoryApi.middleware
    ),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
