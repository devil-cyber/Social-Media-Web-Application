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
    req.flash("success","You have logged Out Sucessfully");
    return res.redirect("/");
}

// get the sign-up data

module.exports.create = function(req, res) {
    if (req.body.password != req.body.c_password) {
        return res.redirect("back");
    }

    User.findOne({ email: req.body.email }, function(e, user) {
        if (e) {
            req.flash("error",e);
        }
        if (!user) {
            User.create(req.body, function(e, user) {
                if (e) {
                     req.flash("error",e);
                }
                req.flash("success","You have Sign up successfully");
                return res.redirect("/users/sign-in");
            });
        } else {
            req.flash("error","this credentials belongs to other user");
            return res.redirect("back");
        }
    });


}

//create session

module.exports.create_session = function(req, res) {
    req.flash("success","Logged  In successfully");
   
    return res.redirect("/");
}



module.exports.update=function(req,res){
    if(req.params.id==req.user.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
           if(err){
               req.flash("error","Invalid Credentials");
           }
           return res.redirect("back");
        });
    }
    else{
        
        return res.status(401).send("Unauthorized");
    }
}