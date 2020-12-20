import allReducers from '../reducers'
import {compose} from 'redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore(
    allReducers,
    composeEnhancer(applyMiddleware(thunk)),
    )

export default store;

