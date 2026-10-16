const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        dateOfBirth: {
            type: Date
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Prefer not to say"]
        },

        state: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: ["OPEN", "OBC", "SC", "ST", "EWS", "Other"],
            required: true
        },

        educationLevel: {
            type: String,
            required: true
        },

        course: {
            type: String,
            required: true
        },

        branch: {
            type: String
        },

        college: {
            type: String
        },

        yearOfStudy: {
            type: Number
        },

        percentage: {
            type: Number
        },

        cgpa: {
            type: Number
        },

        annualFamilyIncome: {
            type: Number,
            required: true
        },

        disability: {
            type: Boolean,
            default: false
        },

        achievements: {
            type: [String],
            default: []
        },

        skills: {
            type: [String],
            default: []
        },

        preferredScholarshipAmount: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "StudentProfile",
    studentProfileSchema
);