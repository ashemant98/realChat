const { messageModel } = require("../models/messageModel");

const getMessageController = async (req, res) => {
  try {
    console.log("inside get message controller");
    const otherUserId = req.params.otherId;
    const currentUserId = req.userId;
    console.log(otherUserId);
    console.log(currentUserId);

    const messages = await messageModel
      .find({
        $or: [
          { sender: currentUserId, receiver: otherUserId },
          { sender: otherUserId, receiver: currentUserId },
        ],
      })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ createdAt: 1 });

    console.log(messages);
    res.json({
      success: true,
      message: "message fetched successfully",
      messages,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "error in getting MEssage controller",
    });
  }
};

const sendMessageController = async (req, res) => {
  try {
    console.log("inside send message controller");
    const { message } = req.body;
    const currentUserId = req.userId;
    const otherUserId = req.params.otherId;

    const sentMessage = await messageModel.create({
      message,
      sender: currentUserId,
      receiver: otherUserId,
    });

    console.log(sentMessage);
    res.json({
      success: true,
      message: "message sent",
      message,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "error in send MEssage controller",
    });
  }
};

module.exports = {
  sendMessageController,
  getMessageController,
};
