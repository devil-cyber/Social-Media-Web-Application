const nodemailer=require("nodemailer");
const ejs=require("ejs");
const path=require("path");


let transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"devilcyber360@gmail.com",
        pass:"acidderative",
    }
});
let renderTemplate=(data,releativePath)=>{
    let mailHTML;
    ejs.renderFile(
     path.join(__dirname,'../views/mailers',releativePath),
     data,
     (err,template)=>{
     if(err){console.log("error in node mailer",err);return};
     mailHTML=template;
     }
    )
    return mailHTML;

}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate,
}