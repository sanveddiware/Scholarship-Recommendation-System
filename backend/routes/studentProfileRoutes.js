const express = require("express");

const {
    createProfile,
    getProfile,
    updateProfile
} = require("../controllers/studentProfileController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProfile);
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

module.exports = router;