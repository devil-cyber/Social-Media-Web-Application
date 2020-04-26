const Post = require("../models/post");


module.exports.home = function(req, res) {
    //     Post.find({}, function(err, post) {
    //         return res.render("home", {
    //             title: "Codeial | Home",
    //             post: post

    //         });
    //     });
    //populate the user that is refrenced with the user object
    Post.find({}).populate("user").exec(function(err, post) {
        return res.render("home", {
            title: "Codeial | Home",
            post: post

        });

    });
}