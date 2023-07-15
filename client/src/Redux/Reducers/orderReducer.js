import actionTypes from "../Constants/actionTypes";
const initState = {
    orders: [],
    order: {},
};

export function orderReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
            };
            
        case actionTypes.SELECTED_ORDER:
            return {
                ...state,
                order: action.payload.order,
            };
        case actionTypes.REMOVE_SELECTED_ORDER:
            return {
                ...state,
                order: {},
            };

        case actionTypes.CREATEORDER:
            return {
                ...state,
                order: action.payload,
                orders: state.orders.push(action.payload),
            };

        case actionTypes.DELETEORDER:
            return {
                ...state,
                orders: state.orders.filter(
                    (order) => order._id !== action.payload
                ),
            };

        default:
            return state;
    }
}
