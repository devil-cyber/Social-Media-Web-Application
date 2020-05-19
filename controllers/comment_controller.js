const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer=require("../mailers/comment_mailer");


module.exports.create = async function(req, res) {
    try{
          let post= await Post.findById(req.body.post);
          if(post){
              let comment=await Comment.create({
               content: req.body.content,
               post: req.body.post,
                user: req.user._id
              });
              post.comment.push(comment);
              
            post.save();
            comment= await comment.populate('user', 'name email').execPopulate();
            console.log(comment);
            commentMailer.newComment(comment);
            req.flash('success','Comment created');
            return res.redirect('back');
        }
        }catch(error){
            req.flash('error',error);
            return;
        }

    
}


module.exports.destroy_comment = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log("error in deleting comment");

        }
        if (comment.user == req.user.id) {
            let postid = comment.post;
            comment.remove();
            req.flash('success','Comment Deleted ');
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } }, function(err, post) {
                return res.redirect("back");
            })
        } else {
            return res.redirect("back");
        }


    });
}