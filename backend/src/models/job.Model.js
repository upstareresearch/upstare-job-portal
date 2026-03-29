const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String, 
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
      required: true,
    },
    qualification: {
      type: String,
      enum: ["Bachelor Degree","Master's Degree", "Diploma"],
      required: true,
      default:"Bachelor Degree"
    },
    experience: {
      type: String, 
      default: "Fresher"
    },
    skills: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("Job-posts", jobSchema);

module.exports = jobModel;
