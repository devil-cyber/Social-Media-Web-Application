const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication, userController.profile);


// sign in

router.get("/sign-in", userController.SignIn);

// sign-up

router.get("/sign-up", userController.SignUp);

//create

router.post("/create", userController.create);

//create session
router.post("/create_session", passport.authenticate(
    "local", {
        failureRedirect: "/users/sign-in"
    }
), userController.create_session);



module.exports = router;