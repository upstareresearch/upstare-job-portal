const applicantsModel = require("../models/applicants.Model");
const jobModel = require("../models/job.Model");
const profileModel = require("../models/profile.Model");


// ------------------------
// job apply controller
// ------------------------

const applyJobController = async (req, res) => {

    try {

        const userId = req.user._id;

        const { jobId } = req.body;

        const profile = await profileModel.findOne({ user: userId });

        if (!profile) {
            return res.status(400).json({
                message: "Profile is not found"
            })
        }

        const isAlreadyApplied = await applicantsModel.findOne({ job: jobId, applicant: userId });

        if (isAlreadyApplied) {
            return res.status(400).json({
                message: "You already applied to this job"
            })
        }


        const newApplications = await applicantsModel.create({
            job: jobId,
            applicant: userId,
            profile: profile._id,
            resumeUrl: profile.resumeUrl
        });


        res.status(201).json({
            success: true,
            message: "Applied successfully",
            applicants: newApplications
        })


    } catch (error) {
        console.log("erro in apply for job", error);
        res.status(500).json({
            success: false,
            message: "server error while applying jobs"
        })
    }
};

//--------------------------------
//  my applicants controller
// ------------------------------

const myApplicantsController = async (req, res) => {
    try {

        const employersId = req.user._id;

        const employersJobs = await jobModel.find({ postedBy: employersId });

        if (!employersJobs) {
            return res.status(404).json({
                message: "jobs not found"
            })
        }

        const jobIds = employersJobs.map((job) => job._id);


        const applicantsList = await applicantsModel
            .find({ job: { $in: jobIds } })
            .populate("job", "title")
            .populate("applicant", " email mobile")
            .populate("profile", " firstName lastName resumeUrl experience qualification");


        res.status(200).json({
            success: true,
            message: "Applicants fetched successfully",
            applicants: applicantsList
        });

    } catch (error) {
        console.log("error fetching the my applicants ", error);
        res.status(500).json({
            success: false,
            message: "error while fetching the my applicants"
        })
    }
};


// --------------------------------
// single applicants controller
// ---------------------------------

const singleApplicantController = async (req, res) => {
    try {

        const applicantId = req.params.id;

        const applicant = await applicantsModel.findById(applicantId)
            .populate("job", "title company location")
            .populate("profile", " firstName lastName email number description dob age gender languages qualification experience resumeUrl photoUrl");


        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: "Applicant not found",
            });
        }

        return res.status(200).json({
            success: true,
            applicant,
        });

    } catch (error) {
        console.log("Single applicant fetch error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching the single applicant",
        });
    }
};


// -------------------------------------------------------------
// it is dashboard api to show the applied jobs controller
// -------------------------------------------------------------

const getAppliedJobsController = async (req, res) => {
    try {

        const userId = req.user._id;

        const applications = await applicantsModel
            .find({ applicant: userId })
            .populate("job", "title company location salary jobType")
            .sort({ createdBy: -1 });

        if (!applications.length) {
            return res.status(200).json({
                success: true,
                applied: [],
                message: "no applied job found"
            })
        }

        const appliedJobs = applications.map(app => ({
            _id: app.job._id,
            title: app.job.title,
            company: app.job.company,
            location: app.job.location,
            salary: app.job.salary,
            jobType: app.job.jobType,
            appliedAt: app.createdAt,
        }));

        res.status(200).json({
            success: true,
            applied: appliedJobs,
        });

    } catch (error) {
        console.log("Error fetching applied jobs:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching applied jobs",
        });
    }
}


module.exports = { applyJobController, myApplicantsController, singleApplicantController, getAppliedJobsController };