import actionTypes from '../Constants/actionTypes';
const initState = {
    products: [],
    product: {}
}

export function productReducer(state = initState, action) {
    switch (action.type) {
        case  actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products
            }
        case  actionTypes.SELECTED_PRODUCT:
            return {
                ...state,
                product: action.payload.product
            }
        case actionTypes.REMOVE_SELECTED_PRODUCT:
            return {
                ...state,
                product: {}
            }
        default:
            return state
    }
}
