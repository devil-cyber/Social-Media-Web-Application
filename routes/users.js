const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get("/profile", userController.profile);


// sign in

router.get("/sign-in", userController.SignIn);

// sign-up

router.get("/sign-up", userController.SignUp);




module.exports = router;