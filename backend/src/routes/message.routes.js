const express = require("express");
const { userMiddleware } = require("../middlewares/user.middleware");
const { getAllChatUserController } = require("../controllers/message.controller");

const router = express.Router();

// --------------------
// get all user api
// ---------------------
router.get("/all/chat-user", userMiddleware, getAllChatUserController);

module.exports = router;