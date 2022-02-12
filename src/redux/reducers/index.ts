import { combineReducers } from 'redux';

import nearAccountReducer from './nearAccountReducer';

const rootReducer = combineReducers({
  account: nearAccountReducer,
});

export default rootReducer;
