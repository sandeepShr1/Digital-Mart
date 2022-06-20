const express = require('express');
const { createBanner, getBanner, updateBanner, deleteBanner, getSingleBanner } = require('../controllers/bannerController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth')

const router = express.Router();

router.route("/admin/banner/new").post(isAuthenticatedUser, authorizeRole("admin"), createBanner);
router.route("/admin/update/banner/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateBanner);
router.route("/admin/banner/:id").delete(isAuthenticatedUser, authorizeRole("admin"), deleteBanner);
router.route("/banner").get(getBanner);
router.route("/banner/:id").get(getSingleBanner);

module.exports = router;