const applicantsModel = require("../models/applicants.Model");
const jobModel = require("../models/job.Model");


// -----------------------
// Dashboard  summary api
// ------------------------
const dashboardSummaryController = async (req, res) => {
    try {

        const employerId = req.user._id;

        const jobs = await jobModel.find({ postedBy: employerId });

        const totalPosts = jobs.length;

        const activePosts = jobs.filter(job => !job.dueDate || job.dueDate > new Date()).length;

        const jobIds = jobs.map(j => j._id);

        const applicants = await applicantsModel
            .find({ job: { $in: jobIds } })
            .populate("job", "title")
            .populate("profile", "email");

        const totalApplicants = applicants.length;

        res.status(200).json({
            success: true,
            message: "Dashboard summary fetched",
            totalPosts,
            activePosts,
            totalApplicants
        });

    } catch (error) {
        console.log("Error fetching dashboard summary:", error);
        res.status(500).json({
            success: false,
            message: "Server error in fetching dashboard summary",
        });

    }
};


module.exports = { dashboardSummaryController };