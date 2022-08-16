let nodemailer = require('nodemailer')
let config = require('../config/config')
let EmailMaker = require('./emailmaker');

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: false,
    service: 'yahoo',
    auth: {
        user: config.EMAIL,
        pass: config.EMAILPASS
    },
    debug: false,
    logger: true
});
var mailOptions = {
    from: '',
    to: 'aneeshvdas@gmail.com',
    subject: '',
    html:''
};

module.exports.sendMail = async (subject,body,to,template)=>{

    console.log(subject, body, to, template)
    mailOptions.from = "aneeshvdas@yahoo.co.in"
    mailOptions.to = to;
    mailOptions.subject = subject ;
    mailOptions.html = EmailMaker.createEmail(body, template) ;
    await  transporter.sendMail(mailOptions,(error,mailResponse)=>{
        if (error) {
            console.log("error in sending mail ",error)
            return Promise.reject({error:error,message:"failed to senf email"})
        } else {
            console.log("mail sent seuccess to ",to);
            return Promise.resolve(mailResponse)
        }
    });
}