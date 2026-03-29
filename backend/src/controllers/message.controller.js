const userModel = require("../models/user.model");

// --------------------------
// Get all user controller
// --------------------------

const getAllChatUserController = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        const users = await userModel.aggregate([
            {
                $match: { _id: { $ne: loggedInUserId } }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "user",
                    as: "profile"
                }
            },
            {
                $unwind: {
                    path: "$profile",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    profilePhoto: "$profile.photoUrl"
                }
            }
        ])

        res.status(200).json({ success: true, users });

    } catch (err) {
        console.error("Error fetching chat users:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = { getAllChatUserController };