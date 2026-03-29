const express = require("express");
const { dashboardSummaryController } = require("../controllers/dashboard.controller");
const { userMiddleware } = require("../middlewares/user.middleware");

const router = express.Router();

// --------------------------
// Dashboard summary api
// --------------------------
router.get("/summary", userMiddleware, dashboardSummaryController);


module.exports = router;