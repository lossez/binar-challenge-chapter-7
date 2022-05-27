const router = require("express").Router();
const restrict = require("../middlewares/restrict");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const userController = require("../controllers/usergame.view.controller");

router.get("/view/dashboard", restrict.auth, (req, res) => {
  const user = req.user;
  res.render("dashboard/index", { user });
});
router.get("/view/profile", restrict.auth, userController.profile);
router.get("/view/profile/edit", restrict.auth, userController.editProfile);
router.post(
  "/api/profile/edit",
  upload.single("profile_picture"),
  userController.updateProfile
);

module.exports = router;
