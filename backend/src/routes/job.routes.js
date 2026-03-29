const express = require("express");
const { userMiddleware } = require("../middlewares/user.middleware");
const { createJobController, getAlljobcontroller, getMyJobController, deletePostController, singleJobPostController, getRecentlyJobsController } = require("../controllers/job.controller");

const router = express.Router();

// -----------------------
// Create job post api
// ------------------------
router.post("/create/post", userMiddleware, createJobController);

// ------------------------
// get all job post api
// ------------------------
router.get("/all/post", getAlljobcontroller);

// ---------------------------
// get the my job post api
// ---------------------------
router.get("/my-posts", userMiddleware, getMyJobController);

// ---------------------------
// get the single post api
// ----------------------------
router.get("/single/post/:id", userMiddleware, singleJobPostController);

// ----------------------
// delete job post api
// -----------------------
router.delete("/delete/post/:id", deletePostController);

// ----------------------
// recent jobs post api
// -----------------------
router.get("/recent/jobs", getRecentlyJobsController);

module.exports = router;