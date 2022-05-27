const router = require("express").Router();
const userGameHistory = require("../controllers/history.controller");

const { jwtAuth } = require("../middlewares/jwt_auth");

router.get("/history", jwtAuth, userGameHistory.getAllHistory);
router.post("/history", jwtAuth, userGameHistory.addHistory);
router.get("/history/:id", jwtAuth, userGameHistory.getHistoryById);
router.put("/history/:id", jwtAuth, userGameHistory.updateHistory);
router.delete("/history/:id", jwtAuth, userGameHistory.deleteHistory);

module.exports = router;
