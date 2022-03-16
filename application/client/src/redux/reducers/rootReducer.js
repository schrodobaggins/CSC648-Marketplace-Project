import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import productReducer from './productReducer';
import sellerSettingsReducer from './sellerSettingsReducer';
import shoppingCartReducer from './shoppingCartReducer';
import buyerSettingsReducer from './buyerSettingsReducer';

export default combineReducers({
  registerReducer,
  loginReducer,
  productReducer,
  shoppingCartReducer,
  sellerSettingsReducer, 
  buyerSettingsReducer,
});