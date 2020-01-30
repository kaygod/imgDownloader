// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../redux';
import api from "../redux/middleware/api";

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router,api);

function configureStore() {
  return createStore(
    rootReducer,
    enhancer
  );
}

export default { configureStore, history };
