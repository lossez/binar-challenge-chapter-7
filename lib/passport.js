require("dotenv").config();
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const LocalStraegy = require("passport-local").Strategy;
const { user_game } = require("../models");

const authenticate = async (username, password, done) => {
  try {
    const user = await user_game.authenticate(username, password);
    return done(null, user);
  } catch (error) {
    return done(error, false, { message: error.message });
  }
};

passport.use(
  new LocalStraegy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    authenticate
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) =>
  done(null, await user_game.findByPk(id))
);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    user_game
      .findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passport;
