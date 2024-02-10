const express = require("express");
const controller = require("./controllers/controller");

const router = express.Router();

router.get("/awake", controller.awake);
router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/protect", controller.protect);

router.all("*", (req, res) => {
  res.send("404 Page not Found");
});

module.exports = router;
