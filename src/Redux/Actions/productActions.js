import actionTypes from "../Constants/actionTypes"

export function setProducts(products) {
    return {
        type: actionTypes.SET_PRODUCTS,
        payload: {
            products
        }
    }
}

export function selectedProduct(product) {
    return {
        type: actionTypes.SELECTED_PRODUCT,
        payload: {
            product
        }
    }
}

export function removeSelectedProduct() {
    return {
        type: actionTypes.REMOVE_SELECTED_PRODUCT,
    }
}