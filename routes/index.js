const router = require("express").Router();
const users = require("./usergame");
const history = require("./history");

const home = require("./home");
const dashboard = require("./dashboard");
const userView = require("./usergame.view");
const historyView = require("./history.view");

const auth = require("./auth");

router.use(auth);

router.use(home);
router.use("/api/", users);
router.use("/api/", history);

router.use("/view/", userView);
router.use("/view/", historyView);

router.use(dashboard);

module.exports = router;
