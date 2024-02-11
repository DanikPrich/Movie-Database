import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import { Provider } from 'react-redux';
import './style/style.scss';
import { createReduxStore } from './store/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createReduxStore()}>
    <Router>
      <App /> 
    </Router>
  </Provider>
);

