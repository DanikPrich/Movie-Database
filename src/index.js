import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import { Provider } from 'react-redux';
import './style/style.scss';
import store from './store/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

