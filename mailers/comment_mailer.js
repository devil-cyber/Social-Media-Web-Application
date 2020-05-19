const nodemailer=require("../config/nodemailer");
//this is another way of exporting a method
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comment/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:'devilcyber360@gmail.com',
        to:comment.user.email,
        subject:"New comment Published",
        html:htmlString,
        // html:'<h1>Your comment is now published</h1>',
    },(err,info)=>{
        if(err){
            console.log("error in rendering the mail",err);
            return;
        }
        console.log("Mail delivred",info);
        return;
    });
}