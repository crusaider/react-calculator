import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store';
import CalculatorComponent from './components/Calculator.component';

const store = createStore(
  rootReducer,
  process.env.NODE_ENV !== 'production'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

ReactDOM.render(
  <Provider store={store}>
    <CalculatorComponent />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
