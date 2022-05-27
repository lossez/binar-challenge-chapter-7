const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");

const getAllHistory = async (req, res) => {
  user_game_history
    .findAll({
      include: [
        {
          model: user_game,
          as: "user_game",
          attributes: ["username"],
          include: [
            {
              model: user_game_biodata,
              as: "user_game_biodata",
              attributes: ["first_name", "last_name", "umur", "gender"],
            },
          ],
        },
      ],
    })
    .then((result) => {
      if (result.length < 1) {
        return res.status(404).json({
          message: "data not found",
        });
      }
      res.status(200).json({
        message: "Success get all history",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: err,
      });
    });
};

const getHistoryById = async (req, res) => {
  user_game_history
    .findByPk(req.params.id, {
      include: [
        {
          model: user_game,
          as: "user_game",
          attributes: ["username"],
          include: [
            {
              model: user_game_biodata,
              as: "user_game_biodata",
              attributes: ["first_name", "last_name", "umur", "gender"],
            },
          ],
        },
      ],
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "History not found",
          data: result,
        });
      }
      res.status(200).json({
        message: "Success get history by id",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: err,
      });
    });
};

const addHistory = async (req, res) => {
  if (req.body.score === "") {
    return res.status(400).json({
      message: "score is required",
    });
  }

  if (isNaN(req.body.score)) {
    return res.status(400).json({
      message: "score must be number",
    });
  }

  if (req.body.user_id === "") {
    return res.status(400).json({
      message: "user_id is required",
    });
  }

  if (isNaN(req.body.user_id)) {
    return res.status(400).json({
      message: "user_id must be number",
    });
  }

  user_game
    .findOne({
      where: {
        id: req.body.user_id,
      },
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "User id not found",
        });
      }
      user_game_history
        .create({
          user_id: req.body.user_id,
          score: req.body.score,
        })
        .then((result) => {
          res.status(201).json({
            message: "History added successfully",
            data: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
            data: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: err,
      });
    });
};

const updateHistory = async (req, res) => {
  user_game_history
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "History not found",
        });
      }
      user_game_history
        .update(
          {
            score: req.body.score,
            user_id: req.body.user_id,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
        .then((result) => {
          res.status(200).json({
            message: "Success update history",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
            data: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: err,
      });
    });
};

const deleteHistory = async (req, res) => {
  user_game_history
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "History not found",
        });
      }
      user_game_history

        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then((result) => {
          res.status(200).json({
            message: "Success delete history",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
            data: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: err,
      });
    });
};

module.exports = {
  getAllHistory,
  getHistoryById,
  addHistory,
  updateHistory,
  deleteHistory,
};
