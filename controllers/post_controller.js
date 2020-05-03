const Post = require("../models/post")
const Comment = require("../models/comment");

module.exports.create = async function(req, res) {
    try{

    Post.create({
        content: req.body.content,
        user: req.user._id
    });
    
        req.flash('success',"Post Created");
        return res.redirect("back");
}catch(err){
    req.flash("error",err);
    return;
}
    
}


module.exports.destroy_post = async function(req, res) {
    try{
    let post =await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success',"Post Deleted");
            return res.redirect("back");
        }
    }catch(err){
        req.flash("error",err);
        return;
    }
}