import { axiosInstance } from "../config/axiosinstance";

// ------------------
// get all user api
// --------------------
export const getAllChatUserApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/message/all/chat-user");
        if (respones) {
            return respones.data;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};