import { axiosInstance } from "../../config/axiosinstance";
import { addUser, removeUser } from "../Reducers/userSlice";

// --------------
// signup api
// ---------------
export const userSignupApi = (Data) => async (dispatch) => {
    try {
        const res = await axiosInstance.post("/api/user/signup", Data);
        if (res) {
            console.log("User is Register")
            return res.data;
        }
    } catch (error) {
        throw error.res?.data || error;
    }
};

// ---------------
// login api
// ---------------
export const userLoginApi = (Data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/user/login", Data)
        if (response) {
            dispatch(addUser(response.data.user));
            return response.data;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};

// ------------------
// logout api
// ------------------
export const userLogoutApi = () => async (dispatch) => {
    try {
        const respones = await axiosInstance.post("api/user/logout");
        if (respones) {
            dispatch(removeUser());
        }
    } catch (error) {
        throw error.respones?.data  || error;
    }
}