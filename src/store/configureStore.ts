



// import createSagaMiddleware from 'redux-saga'
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import { routerMiddleware } from 'connected-react-router';
// If you use react-router, don't forget to pass in your history type.
import { History } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// Import the state interface and our combined reducers/sagas.
import { ApplicationState, createRootReducer } from './index';

export default function configureStore(history: History, initialState: any): Store<ApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({})
  // create the redux-saga middleware
  // const sagaMiddleware = createSagaMiddleware()

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  )

  // Don't forget to run the root saga, and return the store object.
  // sagaMiddleware.run(rootSaga)
  return store
}


// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const initialState = {};
// const middleWare = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   applyMiddleware(...middleWare)
// );

// export default store;
