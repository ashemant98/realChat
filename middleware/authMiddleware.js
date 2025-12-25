const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.autherization;
    const validUser = jwt.decode(token, process.env.JWT_SECRET_KEY);
    if (!validUser)
      res.json({
        success: false,
        message: "error in decoding token",
      });
    else {
      (req.userId = validUser.id), (req.username = validUser.username);
      next();
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "error in auth middlware or in token",
    });
  }
};

module.exports = {
  authMiddleware,
};
