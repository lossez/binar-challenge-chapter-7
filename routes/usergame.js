const router = require("express").Router();
const userController = require("../controllers/usergame.controller");

const { jwtAuth } = require("../middlewares/jwt_auth");

router.get("/usergame", jwtAuth, userController.getAllUser);
router.get("/usergame/:id", jwtAuth, userController.getUserById);
router.post("/usergame", userController.createUser);
router.put("/usergame/:id", jwtAuth, userController.updateUser);
router.delete("/usergame/:id", jwtAuth, userController.deleteUser);

module.exports = router;
