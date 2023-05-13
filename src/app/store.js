import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../features/Auth/authSlice';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    auth: authReducer,
  });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;