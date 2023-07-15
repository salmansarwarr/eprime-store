import { admin } from "../../api/index";
import actionTypes from "../Constants/actionTypes";

export const auth = (password, navigate) => async (dispatch) => {
    try {
        const { data } = await admin(password);

        dispatch({ type: actionTypes.AUTH, data });

        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
