module.exports.profile = function(req, res) {
    return res.render("user_profile", {
        title: "Profile"
    });
}


// render SignUp page
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

}

//create session

module.exports.create_session = function(req, res) {

}