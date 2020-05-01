const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentController = require("../controllers/comment_controller");


router.post("/create", passport.checkAuthentication, commentController.create);
router.get("/destroy_comment/:id", passport.checkAuthentication, commentController.destroy_comment);

module.exports = router;