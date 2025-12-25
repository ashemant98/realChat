const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  sendMessageController,
  getMessageController,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/sendMessage/:otherId", authMiddleware, sendMessageController);
router.get("/getMessage/:otherId", authMiddleware, getMessageController);

module.exports = router;
