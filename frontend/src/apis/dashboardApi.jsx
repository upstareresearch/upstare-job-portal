import { axiosInstance } from "../config/axiosinstance";

// --------------------------
// Dashboard summaru api
// -------------------------
export const dashboardSummaryApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/dashboard/summary");
        if (respones) {
            return respones.data
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};