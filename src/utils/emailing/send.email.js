import nodemailer from 'nodemailer'
import verificationEmailBody from "./verification.emailBody.js";
import htmlBody from "./otp.htmlBody.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fady.atef.adib@gmail.com",
    pass: "stjvsttksdrhfjdn",
  },
});
 const sendingMail = (email, Url,type,user,otp) => {

   let mailOptions = {
     from: "fady.atef.adib@gmail.com",
     to: email,
     subject: "verification ",
     html:
       type == "otpEmailBody"
         ? htmlBody(user,otp,Url)
         : verificationEmailBody(Url),
   };

   transporter.sendMail(mailOptions, function (error, info) {
     if (error) {
       console.log(error);
     } else {
       console.log("Email sent: " + info.response);
     }
   });
 };


export default sendingMail