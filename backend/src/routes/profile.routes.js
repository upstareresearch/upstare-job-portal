const express = require("express");
const upload = require("../db/multer");
const { createProfileController, updateProfileController, getProfileController, getPorfileProgressController } = require("../controllers/profile.controller");
const { userMiddleware } = require("../middlewares/user.middleware");

const router = express.Router();

// -----------------------
// create profile api
// ------------------------
router.post("/profile/create", userMiddleware,
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    createProfileController);


// ----------------------
// get profile api
// -----------------------
router.get("/profile/me", userMiddleware, getProfileController);

// -------------------------
// update profile api
// --------------------------
router.put("/profile/update", userMiddleware,
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    updateProfileController);

// ---------------------------------
// this the profile progress api
//  ----------------------------------
router.get("/profile/progress", userMiddleware, getPorfileProgressController);


module.exports = router;