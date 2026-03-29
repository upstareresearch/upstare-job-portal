const express = require("express");
const { userMiddleware } = require("../middlewares/user.middleware");
const { applyJobController, myApplicantsController, singleApplicantController, getAppliedJobsController } = require("../controllers/applicants.controller");

const router = express.Router();

// --------------------
// api for apply jobs 
// --------------------
router.post("/job/apply", userMiddleware, applyJobController);

// ----------------------
// api for my applicants
// -----------------------
router.get("/my-applicants", userMiddleware, myApplicantsController);

// --------------------------
// api for single applicant
// --------------------------
router.get("/single/:id", singleApplicantController);

// ------------------------------------
// api for dashboard get applied jobs
// -------------------------------------
router.get("/applied-jobs", userMiddleware, getAppliedJobsController);

module.exports = router;