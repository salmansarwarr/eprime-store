import { createOrder, removeOrder } from "../../api";
import actionTypes from "../Constants/actionTypes";

export function setOrders(orders) {
    return {
        type: actionTypes.SET_ORDERS,
        payload: {
            orders,
        },
    };
}

export const create_order = (order) => async (dispatch) => {
    try {
        const { data } = await createOrder(order);
        dispatch({ type: actionTypes.CREATEORDER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteOrder = (id, navigate) => async (dispatch) => {
    try {
        await removeOrder(id);
        dispatch({ type: actionTypes.DELETEORDER, payload: id });

        navigate("/orders");
    } catch (error) {
        console.log(error.message);
    }
};
