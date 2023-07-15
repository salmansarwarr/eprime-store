import actionTypes from "../Constants/actionTypes";
import { create, remove, update } from "../../api/index";

export function setProducts(products) {
    return {
        type: actionTypes.SET_PRODUCTS,
        payload: {
            products,
        },
    };
}

export function selectedProduct(product) {
    return {
        type: actionTypes.SELECTED_PRODUCT,
        payload: {
            product,
        },
    };
}

export function removeSelectedProduct() {
    return {
        type: actionTypes.REMOVE_SELECTED_PRODUCT,
    };
}

export const createProduct = (product, navigate) => async (dispatch) => {
    try {
        const { data } = await create(product);
        dispatch({ type: actionTypes.CREATE, payload: data });

        navigate(`/product/${data._id}`);
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteProduct = (id, navigate) => async (dispatch) => {
    try {
        await remove(id);
        dispatch({ type: actionTypes.DELETE, payload: id });

        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
};

export const updateProduct = (id, product, navigate) => async (dispatch) => {
    try {
        const { data } = await update(id, product);
        dispatch({ type: actionTypes.UPDATE, payload: data });

        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
};
