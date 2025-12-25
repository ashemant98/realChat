const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await userModel.findOne({
      username,
    });

    if (!foundUser) {
      const hashedPassword = bcrypt.hash(password, 10);
      const res = await userModel.create({
        username,
        password: hashedPassword,
      });
      res.status(200).json({
        message: "signup successfull",
      });
    } else {
      res.json({
        message: "username taken or account already exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: "error in signup controller",
      err,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await userModel.findOne({
      username,
    });
    if (!foundUser) {
      res.json({
        message: "Account not found or wrong username",
      });
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (!comparePassword) {
        res.json({
          message: "wrong password",
        });
      } else {
        const token = JWT.sign(
          {
            id: foundUser._id,
            username: foundUser.username,
          },
          process.env.JWT_SECRET_KEY
        );

        res.json({
          success: true,
          message: "Login successfull",
          token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: "error in login controller",
      err,
    });
  }
};

module.exports = {
  loginController,
  signupController,
};
