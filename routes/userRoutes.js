const express = require("express");

const {
  loginController,
  signupController,
  getCurrentUser,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "test route",
  });
});

router.post("/signup", signupController);

router.post("/login", loginController);

router.get("/getUser", authMiddleware, getCurrentUser);

module.exports = router;
