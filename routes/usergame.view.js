const router = require("express").Router();
const userView = require("../controllers/usergame.view.controller");

const restrict = require("../middlewares/restrict");

router.get("/usergame", [restrict.auth, restrict.isAdmin], userView.index);
router.get("/usergame/new", [restrict.auth, restrict.isAdmin], userView.new);
router.get("/usergame/:id", [restrict.auth, restrict.isAdmin], userView.show);
router.get(
  "/usergame/:id/edit",
  [restrict.auth, restrict.isUsergameOwnerOrAdmin],
  userView.edit
);

module.exports = router;
