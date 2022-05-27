const router = require("express").Router();
const historyView = require("../controllers/history.view.controller");

const restrict = require("../middlewares/restrict");

//admin
router.get("/history", restrict.auth, historyView.index);
router.get("/history/new", restrict.auth, historyView.new);
router.get(
  "/history/:id",
  [restrict.auth, restrict.isHistoryOwner],
  historyView.show
);
router.get(
  "/history/:id/edit",
  [restrict.auth, restrict.isHistoryOwner],
  historyView.edit
);
module.exports = router;
