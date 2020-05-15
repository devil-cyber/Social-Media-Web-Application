const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto')
const User=require("../models/user");
passport.use(new googleStrategy({
    clientID:"491844586173-gf7vqvt82bkp1qvi5f07kfoptojf9i86.apps.googleusercontent.com",
    clientSecret:"MCRYBORM_j8P_BKp5CCn0zvK",
    callbackURL:"http://localhost:2000/users/auth/google/callback",
},
function(accessToken,refreshToken,profile,done){
User.findOne({email:profile.emails[0].value}).exec(function(err,user){
    if(err){console.log("error in google passport",err);
    return;
}
console.log(profile);
if(user){
    return done(null,user);
}
else{
User.create({
    name:profile.displayName,
    email:profile.emails[0].value,
    password:crypto.randomBytes(20).toString('hex'),

},function(err,user){
    if(err){
        console.log("error in connecting google outh",err);
        return;
    }
    return done(null,user);
});
}
});
}
));


module.exports=passport;