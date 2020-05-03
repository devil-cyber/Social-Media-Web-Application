const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create = function(req, res) {
    Post.findById(req.body.post, function(err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                if (err) {
                    console.log("error in creating comment");
                }
                post.comment.push(comment);
                post.save();
                req.flash('success','Comment created');
                res.redirect("/");
            });
        }
    });

}

module.exports.destroy_comment = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log("error in deleting comment");

        }
        if (comment.user == req.user.id) {
            let postid = comment.post;
            comment.remove();
            req.flash('success','Comment Deleted');

            Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } }, function(err, post) {
                return res.redirect("back");
            })
        } else {
            return res.redirect("back");
        }


    });
}