const User=require("../../../models/user");
const jwt=require("jsonwebtoken");







module.exports.createSession = async function(req, res) {
    try{
        
        let user= await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            
            return res.json(422,{
                message:"Invalid user username or password"
            });
        }
        else{
            return res.json(200,{
                message:"Here is your token please keep it safe",
                data:{
                    token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})
                }
            })
        }




    }catch(err){
        console.log('****** Error',err);
        return res.json(500,{
       message:"Internal server error"
        });
    }
    
}