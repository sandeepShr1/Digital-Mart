const express = require('express');
const { createBanner, getBanner } = require('../controllers/bannerController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth')

const router = express.Router();

router.route("/admin/banner/new").post(isAuthenticatedUser, authorizeRole("admin"), createBanner);
router.route("/banner").get(getBanner);

module.exports = router;