 const passport= require("passport");
 const User=require("../models/user");

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {
jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey:'codeial'
}
passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


module.exports=passport;