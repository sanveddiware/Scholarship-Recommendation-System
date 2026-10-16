const express = require("express");

const {
    getEligibleScholarships,
    getRecommendations
} = require("../controllers/recommendationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/eligible", protect, getEligibleScholarships);
router.get("/", protect, getRecommendations);

module.exports = router;