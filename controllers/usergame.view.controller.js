const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");

module.exports = {
  index: (req, res) => {
    user_game
      .findAll({
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
        ],
        where: {
          role_id: 2,
        },
      })
      .then((result) => {
        const user = req.user;
        res.render("userGame/index", { result, user });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  show: (req, res) => {
    user_game
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
          {
            model: user_game_history,
            as: "user_game_history",
          },
        ],
      })
      .then((result) => {
        const user = req.user;
        res.render("userGame/user_detail", { result, user });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  new: (req, res) => {
    const user = req.user;
    res.render("userGame/new", { user });
  },

  edit: (req, res) => {
    user_game
      .findByPk(req.params.id, {
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
        ],
      })
      .then((result) => {
        const user = req.user;
        res.render("userGame/edit", { result, user });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  profile: (req, res) => {
    const user = req.user;

    user_game
      .findOne({
        where: {
          id: user.id,
        },
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
        ],
      })
      .then((result) => {
        res.render("dashboard/profile", { result, user });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  editProfile: (req, res) => {
    const user = req.user;
    user_game
      .findOne({
        where: {
          id: user.id,
        },
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
        ],
      })
      .then((result) => {
        res.render("dashboard/edit-profile", { result, user });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  updateProfile: (req, res) => {
    console.log(req.body);
    const user = req.user;
    const dataBody = req.body;
    if (req.file) {
      dataBody.profile_picture = req.file.filename;
    }

    user_game
      .findOne({
        where: {
          id: user.id,
        },
      })
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: "user id not found",
          });
        }
        result.update(req.body).then((result) => {
          return user_game_biodata
            .update(dataBody, {
              where: {
                user_id: user.id,
              },
            })
            .then((result) => {
              res.status(200).json({
                message: "sucessfully update user",
                data: req.body,
              });
            });
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
          data: null,
          error: err.errors,
        });
      });
  },
};
