import actionTypes from "../Constants/actionTypes";
const initState = {
    products: [],
    product: {},
};

export function productReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return {
                ...state,
                products: action.payload.data,
            };

        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
            };
        case actionTypes.SELECTED_PRODUCT:
            return {
                ...state,
                product: action.payload.product,
            };
        case actionTypes.REMOVE_SELECTED_PRODUCT:
            return {
                ...state,
                product: {},
            };

        case actionTypes.CREATE:
            return {
                ...state,
                product: action.payload,
                products: state.products.push(action.payload),
            };

        case actionTypes.DELETE:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product._id !== action.payload
                ),
            };

        case actionTypes.UPDATE:
            return {
                ...state,
                products: state.products.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                ),
            };

        default:
            return state;
    }
}
