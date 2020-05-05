const Post = require("../models/post")
const Comment = require("../models/comment");
const User=require("../models/user")

module.exports.create = async function(req, res) {
    try{

    let post=await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    const user= await User.findOne(req.user._id)
    console.log(user.name);

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post,
                user_data:user.name
            },
            message:'Post created'
        });
        
    }
   
    
        
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

            if (req.xhr){
                return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post Deleted" 
                });
            }
            req.flash('success',"Post Deleted");
            return res.redirect("back");
        }
    }catch(err){
        req.flash("error",err);
        return;
    }
}