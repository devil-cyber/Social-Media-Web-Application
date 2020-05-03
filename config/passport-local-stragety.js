const passport = require("passport");
const LocalStragety = require("passport-local").Strategy;
const User = require("../models/user");


passport.use(new LocalStragety({
        usernameField: "email",
        passReqToCallback:true
    },
    function(req,email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                req.flash("error",err);
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash("error","Invalid username/password");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log("Error in finding the user");
            return done(err);
        }

        return done(null, user);
    });
});

//check if the user is authentiacted
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //if the user is not signed in
    return res.redirect("/users/sign-in");
}
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending thsi to locals for the views     
        res.locals.user = req.user;
    }
    next();
}








module.exports = passport;