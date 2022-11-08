import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/index.scss";
import 'animate.css';
import {AuthProvider} from "./context/AuthProvider";


//redux
//import reduce components here


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
);

