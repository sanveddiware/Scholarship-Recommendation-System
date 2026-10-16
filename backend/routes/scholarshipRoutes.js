
const express = require("express");

const {
    createScholarship,
    getScholarships,
    getScholarship,
    updateScholarship,
    deleteScholarship
} = require("../controllers/scholarshipController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// View scholarships: public access
router
    .route("/")
    .get(getScholarships)
    .post(protect, adminOnly, createScholarship);

// View one scholarship: public access
// Modify a scholarship: admin only
router
    .route("/:id")
    .get(getScholarship)
    .put(protect, adminOnly, updateScholarship)
    .delete(protect, adminOnly, deleteScholarship);

module.exports = router;
