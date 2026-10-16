const StudentProfile = require("../models/StudentProfile");

// Create student profile
const createProfile = async (req, res) => {
    try {
        const existingProfile = await StudentProfile.findOne({
            user: req.user.id
        });

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "Student profile already exists."
            });
        }

        const profile = await StudentProfile.create({
            ...req.body,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Student profile created successfully.",
            data: profile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get student profile
const getProfile = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({
            user: req.user.id
        }).populate("user", "name email");

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found."
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update student profile
const updateProfile = async (req, res) => {
    try {
        const profile = await StudentProfile.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    {
        returnDocument: "after",
        upsert: true,
        runValidators: true
    }
);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Student profile updated successfully.",
            data: profile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createProfile,
    getProfile,
    updateProfile
};