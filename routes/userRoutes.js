const express = require("express");
const app = express();

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "test route",
  });
});

module.exports = router;
