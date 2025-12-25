const { messageModel } = require("../models/messageModel");

const getMessageController = async (req, res) => {
  try {
    const { otherId } = req.params;
    const currentUserId = req.userId;

    const messages = await messageModel.find({
      $or: [
        {
          sender: currentUserId,
          receiver: otherId,
        },
        {
          sender: otherId,
          receiver: currentUserId,
        },
      ],
    });

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
    const { message } = req.body;
    const currentUserId = req.userId;
    const otherUserId = req.params;

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
