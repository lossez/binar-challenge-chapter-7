const router = require("express").Router();
const passport = require("../lib/passport");
const jwt = require("jsonwebtoken");
const { login } = require("../controllers/auth.controller");

router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", passport.authenticate("local", {}), (req, res) => {
  // Token
  const token = jwt.sign(
    { id: req.user.id, username: req.user.username },
    process.env.JWT_SECRET
  );

  res.json({
    token: token,
  });
});
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
