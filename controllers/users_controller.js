const User = require("../models/user");

module.exports.profile = function(req, res) {
    User.findById(req.params.id,function(err,user){
        return res.render("user_profile", {
            title: "Profile",
            user_profile:user,
        });
        
    })
   
}


// render SignUp page

module.exports.SignUp = function(req, res) {
    if (!req.isAuthenticated()) {
        return res.render("user_sign_up", {
            title: "Codeial ! SignUp"
        });
    }
    return res.redirect("/users/profile");

}

// render SignIn page
module.exports.SignIn = function(req, res) {
    if (!req.isAuthenticated()) {
        return res.render("user_sign_in", {
            title: "Codeial ! SignIn"
        });
    }
    return res.redirect("/users/profile");
}


module.exports.destroySession = function(req, res) {
    req.logout();
    return res.redirect("/");
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



module.exports.update=function(req,res){
    if(req.params.id==req.user.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
           if(err){
               console.log("Error in updating the user info.")
           }
           return res.redirect("back");
        });
    }
    else{
        return res.status(401).send("Unauthorized");
    }
}