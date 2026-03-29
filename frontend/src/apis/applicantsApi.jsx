import { axiosInstance } from "../config/axiosinstance"

// -------------------------
// api for my applicants
// --------------------------
export const getMyApplicantsApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/applicants/my-applicants");
        if (respones) {
            return respones.data;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};

// -------------------------------
// api for single applicant
// -------------------------------
export const singleApplicantApi = async (id) => {
    try {
        const respones = await axiosInstance.get(`/api/applicants/single/${id}`);
        if (respones) {
            return respones
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};

// --------------------------------------------
// api for dashboard to get the applied jobs
// --------------------------------------------
export const getAppliedJobsApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/applicants/applied-jobs")
        if (respones) {
            return respones.data;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
}