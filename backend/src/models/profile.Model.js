const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    photoUrl: {
        type: String,
        default: "",
    },
    coverImageUrl: {
        type: String,
        default: "",
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
        minlenght: 10,
        maxlenght: 10,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    age: {
        type: String,
        required: true,
        enum: ["18-24", "25-30", "31-40", "40+"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    languages: {
        type: String,
        required: true,
        enum: ["English", "Hindi", "Other"],
    },
    qualification: {
        type: String,
        required: true,
        enum: ["Bachelor Degree", "Master Degree", "PhD", "Diploma"],
    },
    experience: {
        type: String,
        required: true,
        enum: ["0-1", "2-5", "6-10", "10+"],
    },
    resumeUrl: {
        type: String,
        required: true,
        default: "",
    },
}, { timestamps: true });

const profileModel = mongoose.model("profiles", ProfileSchema);

module.exports = profileModel;
