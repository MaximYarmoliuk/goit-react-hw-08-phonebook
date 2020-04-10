import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import ThemeContext from "../src/contexts/ThemeContext/ThemeContext";
import App from "./components/App/App";
import { store, persistor } from './redux/store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeContext>
        <App />
      </ThemeContext>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
