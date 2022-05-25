// import { all, fork } from 'redux-saga/effects'
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { healthQnReducer } from '../reducers/healthQnReducer';
import { homeReducer } from '../reducers/homeReducer';


// The top-level state object
export interface ApplicationState {
  home: any,
  healthQn: any
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    home: homeReducer,
    healthQn: healthQnReducer,
    router: connectRouter(history)
  })

