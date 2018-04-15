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
import addRecip from './store/reducers/uploadIngredients';
import { searchReducer, pagesReducer, resultsReducer } from './store/reducers/search';
import { loadState, saveState } from './localStorage';

const composeEnhancers = process.env.NODE_ENV === 'development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
// const composeEnhancers = compose;

const rootReducer = combineReducers({
    auth: authReducer,
    addRecip: addRecip,
    searchReducer,
    pagesReducer,
    resultsReducer
});

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(thunk)
));
// const store = createStore(rootReducer, applyMiddleware);
store.subscribe(() => {
    saveState(store.getState());
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);



ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
