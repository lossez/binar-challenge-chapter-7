const router = require("express").Router();
const restrict = require("../middlewares/restrict");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, "public/images/");
    }
    if (file.mimetype === "video/mp4" || file.mimetype === "video/avi") {
      cb(null, "public/videos/");
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
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
router.post("/api/profile/edit", upload.any(), userController.updateProfile);

module.exports = router;
