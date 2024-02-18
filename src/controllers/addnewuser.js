import Newuserschema from '../models/newuser.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';


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
          
        var mailOptions = {
            from: 'technicalhubdriverready@gmail.com',
            to: email,
            subject: 'Welcome To ASTEC!',
            text: 'Hello '+fname+' '+lname+', Thanks For Registering,On behalf of everyone at ASTEC, I am thrilled to extend a warm welcome to you as our newest member! 🚀✨',
            attachments:[{
                filename:profile,
                path:'public/profiles/'+profile
            },{
                filename:'nav_icon.jpg',
                path:'public/images/nav_icon.jpg'
            },{
                filename:'astec.pdf',
                path:'public/pdfs/astec.pdf'
            }]
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