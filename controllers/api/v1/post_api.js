const Post=require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.index= async function(req,res){
    const posts= await Post.find({}).populate("user").sort('-createdAt').populate({
    
        path: "comment",
        populate: {
            path: "user"
        }
    });
     return res.json(200,{
        message:"List of Post",
        posts:posts
    });
}


module.exports.destroy= async function(req, res) {
    try{
    let post =await Post.findById(req.params.id);
    if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({ post: req.params.id });
        return res.json(200,{
            message:"Post Deleted"
        });
    }
    else{
        return res.json(401,{
            message:"You cannot deleate this post"
        });
    }
            
    }catch(err){
        console.log("#############Error",err);
        return res.json(500,{
            message:"Interval Server Error"
        });
    }
}