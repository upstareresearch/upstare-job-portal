const express = require("express");
const { signupController, loginController, logoutController, changePasswordController } = require("../controllers/user.controller");
const { userMiddleware } = require("../middlewares/user.middleware");

const router = express.Router();

// ---------------------
// Current user api
// ----------------------
router.get("/me", userMiddleware, (req, res) => {
    return res.status(200).json({
        message: "user is logged in",
        user: req.user
    })
})

// ------------------------
// user signup api
// -------------------------
router.post("/signup", signupController);

// -------------------------
// user login api
// --------------------------
router.post("/login", loginController);

// -------------------
// user logout api
// -------------------
router.post("/logout", userMiddleware, logoutController);

// ----------------------
// change password api
// ----------------------
router.put("/change-password", userMiddleware, changePasswordController);

module.exports = router;




