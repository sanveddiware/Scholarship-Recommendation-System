const Scholarship = require("../models/Scholarship");
const { refreshScholarshipIndex } = require("../services/mlService");
// @desc    Create a scholarship
// @route   POST /api/scholarships


const refreshIndexSafely = async () => {
    try {
        await refreshScholarshipIndex();
    } catch (error) {
        console.error("FAISS refresh failed:", error.message);
    }
};

const createScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.create(req.body);
        await refreshIndexSafely();
        res.status(201).json({
            success: true,
            message: "Scholarship created successfully",
            data: scholarship
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all scholarships
// @route   GET /api/scholarships
const getScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: scholarships.length,
            data: scholarships
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get scholarship by ID
// @route   GET /api/scholarships/:id
const getScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);

        if (!scholarship) {
            return res.status(404).json({
                success: false,
                message: "Scholarship not found"
            });
        }

        res.status(200).json({
            success: true,
            data: scholarship
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid scholarship ID"
        });
    }
};

// @desc    Update scholarship
// @route   PUT /api/scholarships/:id
const updateScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!scholarship) {
            return res.status(404).json({
                success: false,
                message: "Scholarship not found"
            });
        }
        await refreshIndexSafely();
        res.status(200).json({
            success: true,
            message: "Scholarship updated successfully",
            data: scholarship
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete scholarship
// @route   DELETE /api/scholarships/:id
const deleteScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findByIdAndDelete(
            req.params.id
        );

        if (!scholarship) {
            return res.status(404).json({
                success: false,
                message: "Scholarship not found"
            });
        }
        await refreshIndexSafely();
        res.status(200).json({
            success: true,
            message: "Scholarship deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid scholarship ID"
        });
    }
};

module.exports = {
    createScholarship,
    getScholarships,
    getScholarship,
    updateScholarship,
    deleteScholarship
};