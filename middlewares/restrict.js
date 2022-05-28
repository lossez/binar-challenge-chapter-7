const { user_game, user_game_history } = require("../models");
module.exports = {
  auth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  isAdmin(req, res, next) {
    if (req.user.role_id === 1) {
      next();
    } else {
      res.redirect("/view/dashboard");
    }
  },
  isCurrentUser(req, res, next) {
    if (req.user.id == req.params.user_id) {
      next();
    } else {
      res.redirect("/view/dashboard");
    }
  },

  isCurrentUserOrAdmin(req, res, next) {
    if (req.query.user_id == req.user.id || req.user.role_id == 1) {
      next();
    } else {
      res.send("cant aceess");
    }
  },
  isHistoryOwner(req, res, next) {
    user_game_history
      .findByPk(req.params.id)
      .then((result) => {
        if (result.user_id == req.user.id) {
          next();
        } else {
          res.redirect("/view/dashboard");
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  isHistoryOwnerOrAdmin(req, res, next) {
    user_game_history
      .findByPk(req.params.id)
      .then((result) => {
        if (result.user_id == req.user.id || req.user.role_id == 1) {
          next();
        } else {
          res.redirect("/view/dashboard");
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  isUsergameOwnerOrAdmin(req, res, next) {
    user_game
      .findByPk(req.params.id)
      .then((result) => {
        if (result.user_id == req.user.id || req.user.role_id == 1) {
          next();
        } else {
          res.redirect("/view/dashboard");
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
};
