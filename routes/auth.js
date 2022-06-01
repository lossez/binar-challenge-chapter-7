const router = require("express").Router();
const passport = require("../lib/passport");
const auth = require("../controllers/auth.controller");

//API AUTH
router
  .post("/api/auth/login", passport.authenticate("local", {}), auth.login)
  .post("/api/auth/register", auth.register)
  .post("/api/auth/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  })
  .post("/api/auth/send-reset-password", auth.sendResetPassword)
  .post("/api/auth/new-password", auth.newPassword);

//VIEW
router
  .get("/login", (req, res) => {
    res.render("auth/login");
  })

  .get("/register", (req, res) => {
    res.render("auth/register");
  })
  .get("/reset-password", (req, res) => {
    res.render("auth/resetPassword");
  })

  .get("/new-password", (req, res) => {
    res.render("auth/newPassword");
  });

module.exports = router;
