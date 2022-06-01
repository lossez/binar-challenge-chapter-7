const { user_game, user_game_biodata } = require("../models");
const mail = require("./mailer.controller");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await user_game.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return res.status(400).json({
          message: "Username is not registered",
        });
      }
      if (!user.validPassword(password)) {
        return res.status(400).json({
          message: "Password is incorrect",
        });
      }
      const token = user.generateToken();
      return res.status(200).json({
        message: "Login success",
        token,
        success: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = await user_game.findOne({
        where: {
          username,
        },
      });
      if (user) {
        return res.status(400).json({
          message: "Username is already registered",
        });
      }
      const email_user = await user_game_biodata.findOne({
        where: {
          email,
        },
      });
      if (email_user) {
        return res.status(400).json({
          message: "Email is already registered",
        });
      }
      const newUser = await user_game.create({
        username,
        password: user_game.generateHash(password),
        role_id: 2,
      });
      if (newUser) {
        const newBiodata = await user_game_biodata.create({
          user_id: newUser.id,
          email,
        });
        mail.sendMail(
          email,
          "Welcome to Our App",
          `Hi ${username}, welcome to our app. \nThank you for registering. \n Enjoy our app.`
        );
      }
      const token = newUser.generateToken();
      return res.status(200).json({
        message: "Register success",
        token,
        success: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await user_game.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).json({
          message: "Email is not registered",
        });
      }
      const token = user.generateToken();
      return res.status(200).json({
        message: "Reset password success",
        token,
        success: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  sendResetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await user_game_biodata.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).json({
          message: "Email is not registered",
        });
      }
      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      mail.sendMail(
        email,
        "Reset Password",
        `Hi ${user.email}, you can reset your password by clicking on the link below.\n`,
        `<a href='http://localhost:3000/new-password/?token=${token}'>Reset Password</a>`
      );
      return res.status(200).json({
        message: "Password reset link has been sent to your email",
        success: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  newPassword: async (req, res) => {
    try {
      const { password, token } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userEmail = await user_game_biodata.findOne({
        where: {
          email: decoded.email,
        },
      });
      if (!userEmail) {
        return res.status(400).json({
          message: "Email is not registered",
        });
      }
      if (userEmail) {
        const user = await user_game.findOne({
          where: {
            id: userEmail.user_id,
          },
        });
        user.password = user_game.generateHash(password);
        await user.save();
        return res.status(200).json({
          message: "Password has been reset",
          success: true,
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
};
