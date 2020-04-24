module.exports.profile = function(req, res) {
    return res.render("user_profile", {
        title: "Profile"
    });
}


// render SignUp page
const User = require("../models/user");
module.exports.SignUp = function(req, res) {
    return res.render("user_sign_up", {
        title: "Codeial ! SignUp"
    });
}

// render SignIn page
module.exports.SignIn = function(req, res) {
    return res.render("user_sign_in", {
        title: "Codeial ! SignIn"
    });
}

// get the sign-up data

module.exports.create = function(req, res) {
    if (req.body.password != req.body.c_password) {
        return res.redirect("back");
    }

    User.findOne({ email: req.body.email }, function(e, user) {
        if (e) {
            console.log("Error in sign-up");
        }
        if (!user) {
            User.create(req.body, function(e, user) {
                if (e) {
                    console.log("Error in creating the sign-up credentials");
                }
                return res.redirect("/users/sign-in");
            });
        } else {
            return res.redirect("back");
        }
    });


}

//create session

module.exports.create_session = function(req, res) {
    return res.redirect("/");
}