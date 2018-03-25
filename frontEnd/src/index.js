import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth';
import { searchReducer, resultsReducer } from './store/reducers/search';

// const composeEnhancers = process.env.NODE_ENV === 'development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
const composeEnhancers = compose;

const rootReducer = combineReducers({
    auth: authReducer,
    searchReducer,
    resultsReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
// const store = createStore(rootReducer, applyMiddleware);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);



ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
