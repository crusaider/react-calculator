import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store';
import CalculatorComponent from './components/Calculator.component';

const nodeEnv =
  typeof process !== 'undefined'
    ? (process as { env?: { [key: string]: string | undefined } }).env
        ?.NODE_ENV
    : undefined;

const isProduction =
  nodeEnv === 'production' ||
  import.meta.env.PROD;

const store = createStore(
  rootReducer,
  !isProduction
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CalculatorComponent />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
