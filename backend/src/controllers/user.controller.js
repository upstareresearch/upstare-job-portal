const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const cacheClient = require("../services/cache.services");

// ------------------------------
// sign Up User Controller
// ------------------------------

const signupController = async (req, res) => {

    try {

        const { fullName, username, email, password, mobile, role } = req.body;

        if (!fullName || !username || !email || !password || !mobile || !role) {
            return res.status(422).json({
                messsage: "All Field are Required"
            });
        }

        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }, { mobile }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User is Already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);


        const newUser = await userModel.create({
            fullName,
            username,
            mobile,
            email,
            password: hash,
            role
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: "none"
        })

        return res.status(201).json({
            success: true,
            message: "User is Registered Successfully",
            newUser: {
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                role: newUser.role
            }
        });
        ;
    } catch (error) {
        console.log("error in signup", error)
        return res.status(500).json({
            success: false,
            message: "error in sign up",
            error: error
        });

    };
};

// ---------------------------
// Login User Controller
// ---------------------------

const loginController = async (req, res) => {

    try {

        const { email, username, mobile, password, role } = req.body;

        const user = await userModel.findOne({
            email
            // $or: [{ email }, { username }, { mobile }]
        });

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Role is incorrect"
            })
        }

        const decryptpass = await bcrypt.compare(password, user.password);

        if (!decryptpass) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: "none"
        });

        return res.status(200).json({
            success: true,
            message: "User is LoggedIn",
            user: {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                role: user.role

            }
        });

    } catch (error) {
        console.log("error in login ", error);
        return res.status(500).json({
            success: false,
            message: "error in login",
            error: error
        });
    };

};

// -----------------------------
// logout user controller
// -----------------------------

const logoutController = async (req, res) => {

    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(404).json({
                message: "Token is not found"
            })
        }

        // await cacheClient.set(token, "blacklisted")

        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "user is logout "
        })
    } catch (error) {
        console.log("error in logout", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
};

// -----------------------------
// change password controller
// ------------------------------

const changePasswordController = async (req, res) => {
    try {
        const userId = req.user._id;

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "all field are required"
            })
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "user is not found"
            })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "current password is incorrect"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashPassword;

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.log("Error changing password:", error);
        res.status(500).json({
            success: false,
            message: "Server error changing password",
            error:error
        });
    };
};


module.exports = {
    signupController,
    loginController,
    logoutController,
    changePasswordController
};