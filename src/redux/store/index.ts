import { applyMiddleware, createStore, compose, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// import { ENABLE_REDUX_LOGGER } from 'src/config';
import rootReducer from '../reducers/index';

// const loggerMiddleware = createLogger();

const store = (preloadedState = {}) => {
  const middlewares = [thunkMiddleware];

  // if (ENABLE_REDUX_LOGGER) {
  //   middlewares.push(loggerMiddleware);
  // }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: StoreEnhancer = compose(...enhancers);

  return createStore(rootReducer, preloadedState, composedEnhancers);
};
export default store;
