import { axiosInstance } from "../config/axiosinstance"

// ------------------------------
// user create profile api
// -----------------------------
export const createProfileApi = async (data) => {
    try {
        const res = await axiosInstance.post("/api/user/profile/create", data);
        if (res) {
            console.log("profile data is saved");
        }
    } catch (error) {
        throw error.res?.data || error;
    }
};

// -----------------------
// get profile api
// -----------------------
export const getProfileApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/user/profile/me");
        if (respones) {
            return respones.data;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};

// ---------------------
// update profile api
// ---------------------
export const updateProfileApi = async (data) => {
    try {
        const response = await axiosInstance.put("/api/user/profile/update", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ---------------------------------------------
// this the job seeker profile progress api
// ---------------------------------------------
export const getProfileProgressAPi = async () => {
    try {
        const respones = await axiosInstance.get("/api/user/profile/progress");
        if (respones) {
            return respones.data;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};