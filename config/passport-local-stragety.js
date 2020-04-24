const passport = require("passport");
const LocalStragety = require("passport-local").Strategy;
const User = require("../models/user");


passport.use(new LocalStragety({
        usernameField: "email"

    },
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log("Error in -->passport");
                return done(err);
            }
            if (!user || user.passowrd != password) {
                console.log("Invalid username/password");
                return (null, false);
            }
            return (null, user);
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


module.exports = passport;