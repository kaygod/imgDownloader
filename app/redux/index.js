// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './modules/homepage/reducer';
import detail from './modules/detailpage/reducer';


export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    home,
    detail
  });
}
