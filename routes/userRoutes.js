const express = require("express");
const {
  loginController,
  signupController,
} = require("../controllers/authController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "test route",
  });
});

router.post("/signup", signupController);

router.post("/login", loginController);

module.exports = router;
