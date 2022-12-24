import { combineReducers } from 'redux';
import { productReducer } from './productReducer';

const reducer = combineReducers({
    allproducts: productReducer
})

export default reducer