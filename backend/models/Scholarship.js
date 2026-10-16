const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
    {
        scholarshipId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        provider: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        amount: {
            type: Number,
            default: 0
        },

        educationLevels: {
            type: [String],
            default: []
        },

        eligibleCourses: {
            type: [String],
            default: []
        },

        eligibleStates: {
            type: [String],
            default: []
        },

        eligibleCategories: {
            type: [String],
            default: []
        },

        genderEligibility: {
            type: [String],
            default: ["All"]
        },

        incomeLimit: {
            type: Number,
            default: null
        },

        minimumPercentage: {
            type: Number,
            default: null
        },

        minimumCGPA: {
            type: Number,
            default: null
        },

        ageLimit: {
            type: Number,
            default: null
        },

        deadline: {
            type: Date,
            default: null
        },

        documentsRequired: {
            type: [String],
            default: []
        },

        applicationUrl: {
            type: String,
            default: ""
        },

        sourceUrl: {
            type: String,
            default: ""
        },

        sourceType: {
            type: String,
            enum: ["website", "pdf", "manual"],
            default: "manual"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Scholarship", scholarshipSchema);