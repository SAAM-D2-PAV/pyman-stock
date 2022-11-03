import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/index.scss";
import 'animate.css';

//redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
     rootReducer,
)





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>

      <App />

    </Provider>

  </React.StrictMode>
);

