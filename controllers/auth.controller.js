const { user_game } = require("../models");
// const passport = require("../lib/passport");

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
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  // login: passport.authenticate("local", {
  //   successRedirect: "/view/dashboard",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  // }),
};
