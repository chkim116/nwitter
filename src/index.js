import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
