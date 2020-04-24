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


// serializing cookies

passport.serializeUser(user, done) {
    done(null, user.id);
}


//deserializing cookies

passport.deserializeUser(id, done) {
    User.findById(id, function(e, user) {
        if (e) {
            console.log("Error in finding user");
            return done(err);
        }
        return done(null, user);

    })
}


module.exports = passport;