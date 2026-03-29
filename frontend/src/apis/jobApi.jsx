import { axiosInstance } from "../config/axiosinstance"

// ------------------------
// create job post api
// ------------------------
export const createJobpostApi = async (data) => {
    try {
        const respones = await axiosInstance.post("/api/job/create/post", data);
        if (respones) {
            return respones.data;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};

// ----------------------
// get all job post api
// ----------------------
export const getAllJobApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/job/all/post");
        if (respones) {
            return respones;
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};

// -----------------------
// get my job post api
// ------------------------
export const getMyJobPostApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/job/my-posts");
        if (respones) {
            return respones.data
        }
    } catch (error) {
        throw error.respones?.data || error;
    }
};

// -------------------
// apply for job api
// --------------------
export const applyJobApi = async (postId) => {
    try {
        const respones = await axiosInstance.post("/api/applicants/job/apply", postId);
        if (respones) {
            console.log("applied successfully");
            return respones
        }
    } catch (error) {
        console.log("error applying job", error)
    }
};

// --------------------------
// delete job post api
// --------------------------
export const delelteJobPostApi = async (postId) => {
    try {
        const respones = await axiosInstance.delete(`/api/job/delete/post/${postId}`);
        if (respones) {
            return respones.data
        }
    } catch (error) {
        console.log("error delete api", error)
    }
};

// --------------------------------
// fatching the recent jobs api
// ---------------------------------
export const getRecentJobsApi = async () => {
    try {
        const respones = await axiosInstance.get("/api/job/recent/jobs");
        if (respones) {
            return respones.data;
        }
    } catch (error) {
        console.log("error fetching the recent jobs", error)
    }
};

