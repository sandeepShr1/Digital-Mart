const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout,
      forgotPassword, resetPassword, getUserDetails,
      updatePassword, updateProfile, getAllUsers,
      getSingleUser,
      updateUserProfile,
      deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);

router.route("/admin/users/:id").get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser);

router.route("/admin/users/update/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateUserProfile);

router.route("/admin/users/delete/:id").delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

module.exports = router;