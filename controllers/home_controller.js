const Post = require("../models/post");
const User=require("../models/user");

module.exports.home = async function(req, res) {

    try{
const posts= await Post.find({}).populate("user").populate({
            path: "comment",
            populate: {
                path: "user"
            }
        });

    const user= await User.find({});



    return res.render("home", {
        title: "Codeial | Home",
        post: posts,
        user_list:user
    
    });

    }catch(err){
        console.log("Error",err);
    }
    
  

}
