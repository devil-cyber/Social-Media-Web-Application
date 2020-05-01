const Post = require("../models/post");
const User=require("../models/user");

module.exports.home = function(req, res) {
    //     Post.find({}, function(err, post) {
    //         return res.render("home", {
    //             title: "Codeial | Home",
    //             post: post

    //         });
    //     });
    //populate the user that is refrenced with the user object
    Post.find({}).populate("user").populate({
            path: "comment",
            populate: {
                path: "user"
            }
        })
        .exec(function(err, post) {
            User.find({},function(err,user){
                return res.render("home", {
                    title: "Codeial | Home",
                    post: post,
                    user_list:user
    
                });

            });

            

        });
}