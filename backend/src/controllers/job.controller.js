const jobModel = require("../models/job.Model");


// ----------------------------
// create job controller
// ----------------------------

const createJobController = async (req, res) => {

    try {
        const userId = req.user._id;

        const { title, company, location, salary, jobType, description, qualification, experience, skills, dueDate } = req.body;

        if (!title || !company || !location || !salary || !experience) {
            return res.status(400).json({
                message: "All field is required"
            });
        }

        const job = await jobModel.create({
            title,
            company,
            location,
            salary,
            jobType,
            description,
            qualification,
            experience,
            skills,
            dueDate,
            postedBy: userId
        });

        return res.status(200).json({
            success: true,
            message: "job post created successfully",
            job
        })

    } catch (error) {
        console.log("error in create job post ", error);
        res.status(500).json({
            success: false,
            message: "server error while creating post"
        })
    }
};

// ---------------------------
// get all job controller
// ---------------------------

const getAlljobcontroller = async (req, res) => {
    try {

        const job = await jobModel
            .find()
            .sort({ createdAt: -1 })
            .populate("postedBy", "firstName lastName email");

        return res.status(200).json({
            success: true,
            message: "Job post fetched successfully",
            job
        })

    } catch (error) {
        console.log("error in fetch the job post", error);
        res.status(500).json({
            success: false,
            message: "server error in fetch job post"
        })
    }
};

// -------------------------------
// get my job post controller
// -------------------------------

const getMyJobController = async (req, res) => {
    try {

        const employerId = req.user._id;

        const jobs = await jobModel
            .find({ postedBy: employerId })
            .sort({ createdAt: -1 });


        if (!jobs) {
            return res.status(404).json({
                message: "single jobs post is not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "my jobs fetched successfully",
            jobs
        })

    } catch (error) {
        console.log("error to get the single job post", error);
        res.status(500).json({
            success: false,
            message: "error while fetching my jobs"
        })

    };
};

// ------------------------------
// single job post controller
// -------------------------------

const singleJobPostController = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await jobModel.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({
            success: true,
            message: "Single job post fetched successfully",
            job,
        });

    } catch (error) {
        console.log("Error in fetching single job post", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// -------------------------
// Delete post controller
// --------------------------

const deletePostController = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await jobModel.findById(jobId);

        await job.deleteOne();

        res.status(200).json({
            success: true,
            message: "Job post deleted successfully ✅"
        });

    } catch (error) {
        console.log("error to delete post");
        res.status(500).json({
            success: false,
            message: "error while delete the post"
        })
    }
};


// ---------------------------------------------
// dashboard controller for recently job posts
// ----------------------------------------------

const getRecentlyJobsController = async (req, res) => {
    try {

        const recentJobs = await jobModel
            .find()
            .sort({ createdAt: -1 })
            .limit(2)
            .select("title companyName location salary jobType createdAt");

        res.status(200).json({
            success: true,
            recommended: recentJobs,
        });

    } catch (error) {
        console.error("Error fetching recent jobs:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching recent jobs",
        });
    }
};


module.exports = {
    createJobController,
    getAlljobcontroller,
    getMyJobController,
    singleJobPostController,
    deletePostController,
    getRecentlyJobsController
};