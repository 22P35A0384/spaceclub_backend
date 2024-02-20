import Newuserschema from '../models/newuser.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import handlebars from 'handlebars';


const Addnewuser = async(req,res,next)=>{
    // console.log(req.body)
    const profile = (req.file) ? req.file.filename : null
    const {fname,lname, password, email} = req.body;
    const hashedPassowrd = bcrypt.hashSync(password)
    const formdata = new Newuserschema({
        fname,
        lname,
        password:hashedPassowrd,
        email,
        profile 
    })
    try{
        formdata.save()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'technicalhubdriverready@gmail.com',
              pass: 'aqlp joww mqgk fmbw'
            }
        });
        const source = fs.readFileSync('public/mail_templates/otpEmail.hbs', 'utf8');
        const template = handlebars.compile(source);
        const Name = fname+" "+lname
        // Render the template with OTP
        const html = template({ otp,Name });
        var mailOptions = {
            from: 'technicalhubdriverready@gmail.com',
            to: email,
            subject: 'Welcome To ASTE',
            html:html
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.send({msg:'Your Account Was Created, You Will Be Redirected To Login Page'})
        
    }catch(err){
        console.log(err)
    }
    return res.status(200).json({formdata})
}

export default Addnewuser;