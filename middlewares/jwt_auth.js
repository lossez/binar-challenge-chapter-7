const passport = require("../lib/passport");
require("dotenv").config();
module.exports = {
  jwtAuth: passport.authenticate("jwt", { session: false }),
};
