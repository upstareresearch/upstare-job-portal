const profileModel = require("../models/profile.Model");
const imageKitSendFiles = require("../services/storage.services");
const { findByIdAndUpdate } = require("../models/user.model");


// ------------------------------
// create profile controller
// ------------------------------

const createProfileController = async (req, res) => {

    try {

        const userID = req.user._id

        const { firstName, lastName, email, number, description, dob, age, gender, languages, qualification, experience } = req.body;

        let photoUrl = "";
        let coverImageUrl = "";
        let resumeUrl = "";

        // uploading photo to imagekit
        if (req.files["photo"]) {
            const photo = req.files.photo[0].buffer;
            const fileName = req.files.photo[0].originalname
            const uploadPhoto = await imageKitSendFiles(photo, fileName);

            photoUrl = uploadPhoto.url;
        }

        // uploading coverImage to imageKit
        if (req.files["coverImage"]) {
            const coverImage = req.files.coverImage[0].buffer;
            const fileNmae = req.files.coverImage[0].originalname;
            const uploadCoverImage = await imageKitSendFiles(coverImage, fileNmae);

            coverImageUrl = uploadCoverImage.url;
        }

        // uploading resume to imageKit
        if (req.files["resume"]) {
            const resume = req.files.resume[0].buffer;
            const fileName = req.files.resume[0].originalname;
            const uploadResume = await imageKitSendFiles(resume, fileName);

            resumeUrl = uploadResume.url;
        }

        const profile = await profileModel.create({
            user: userID,
            photoUrl,
            coverImageUrl,
            firstName,
            lastName,
            email,
            number,
            description,
            dob,
            age,
            gender,
            languages,
            qualification,
            experience,
            resumeUrl
        });

        res.status(201).json({
            success: true,
            message: "profile details are saved",
            profile
        })


    } catch (error) {
        console.log("error in profile controller", error);
        return res.status(500).json({
            success: false,
            message: "error creating profile"
        })
    }

};

// ----------------------------
// upadate profile controller
// ----------------------------

const updateProfileController = async (req, res) => {

    try {
        const userId = req.user._id;

        const profile = await profileModel.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({
                message: "profile is not found"
            });
        }

        const updateData = { ...req.body };

        // uploading updated photo in imageKit
        if (req.files?.photo) {
            const photo = req.files.photo[0].buffer;
            const fileName = req.files.photo[0].originalname;
            const uploadedPhoto = await imageKitSendFiles(photo, fileName);

            updateData.photoUrl = uploadedPhoto.url;

        }

        // uploading updated cover Image in imageKit
        if (req.files?.coverImage) {
            const coverImage = req.files.coverImage[0].buffer;
            const fileName = req.files.coverImage[0].originalname;
            const uploadCoverImage = await imageKitSendFiles(coverImage, fileName);

            updateData.coverImageUrl = uploadCoverImage.url;
        }

        // uploading updated resume in imageKit
        if (req.files?.resume) {
            const resume = req.files.resume[0].buffer;
            const fileName = req.files.resume[0].originalname;
            const uploadResume = await imageKitSendFiles(resume, fileName);

            updateData.resumeUrl = uploadResume.url;
        }

        const updatedProfile = await profileModel.findOneAndUpdate(
            { user: userId },
            { $set: updateData },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "profile updated successfully",
            profile: updatedProfile
        })


    } catch (error) {
        console.log("error in update profile");
        res.status(500).json({
            success: false,
            message: "error in updating profile",
            error: error
        })
    }

};

// -------------------------------
// get profile data controller
// -------------------------------

const getProfileController = async (req, res) => {
    try {
        const userId = req.user._id
        const profile = await profileModel.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({
                message: 'profile not found'
            })
        }

        res.status(200).json({
            message: "profile is fetched",
            profile
        })

    } catch (error) {
        console.log("error in the get profile", error)
    }

};

// ------------------------------------------------------------------------------
// this is the dashboard api controller for job seeker to so the profile progress
// ------------------------------------------------------------------------------

const getPorfileProgressController = async (req, res) => {
    try {
        const userId = req.user._id;

        const profile = await profileModel.findOne({ user: userId })

        if (!profile) {
            return res.status(200).json({
                success: true,
                percent: 0,
                message: "Profile not found",
            });
        }

        const fieldsToCheck = [
            "photoUrl",
            "coverImageUrl",
            "firstName",
            "lastName",
            "email",
            "number",
            "description",
            "dob",
            "age",
            "gender",
            "languages",
            "qualification",
            "experience",
            "resumeUrl",
        ];

        let filledCount = 0;

        fieldsToCheck.map((field) => {
            if (profile[field] && profile[field] !== "") {
                filledCount++
            }
        })

        const percent = Math.round((filledCount / fieldsToCheck.length) * 100);

        res.status(200).json({
            success: true,
            message: "profile progress fetched successfully ",
            percent,
        });


    } catch (error) {
        console.log("Error fetching profile progress:", error);
        res.status(500).json({
            success: false,
            message: "Server error while calculating profile progress",
            error: error
        });
    }
};

module.exports = {
    createProfileController,
    updateProfileController,
    getProfileController,
    getPorfileProgressController
};