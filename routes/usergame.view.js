const router = require("express").Router();
const userView = require("../controllers/usergame.view.controller");

const restrict = require("../middlewares/restrict");

router.get("/usergame", [restrict.auth, restrict.isAdmin], userView.index);
router.get("/usergame/new", [restrict.auth, restrict.isAdmin], userView.new);
router.get("/usergame/:id", [restrict.auth, restrict.isAdmin], userView.show);
router.get(
  "/usergame/:id/edit",
  [restrict.auth, restrict.isCurrentUser],
  userView.edit
);

module.exports = router;

// const router = require("express").Router();
// const userView = require("../controllers/usergame.view.controller");

// const { isAdmin, isCurrentUser } = require("../middlewares/jwt_auth");
// const { auth } = require("../middlewares/restrict");
// // router.get("/usergame", [restrict, isAdmin], userView.index);
// router.get("/usergame", auth, userView.index);
// // router.get("/usergame/new", [restrict.auth, isAdmin], userView.new);
// // router.get("/usergame/:id", restrict.auth, userView.show);
// // router.get("/usergame/:id/edit", restrict.auth, userView.edit);

// module.exports = router;
