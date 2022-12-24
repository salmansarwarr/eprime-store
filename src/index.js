import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/store';
import './style.scss';

const root = ReactDOMClient.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)