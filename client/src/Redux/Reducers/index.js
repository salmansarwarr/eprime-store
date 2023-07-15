import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import authReducer from "./authReducer";
import { orderReducer } from "./orderReducer";

const reducer = combineReducers({
    allproducts: productReducer,
    allOrders: orderReducer,
    auth: authReducer,
});

export default reducer;
