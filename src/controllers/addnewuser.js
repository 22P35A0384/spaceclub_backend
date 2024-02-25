import Newuserschema from '../models/newuser.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import handlebars from 'handlebars';

const Addnewuser = async (req, res, next) => {
    const profile = (req.file) ? req.file.filename : null;
    const { fname, lname, password, email } = req.body;

    try {
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10); // You can specify the number of salt rounds (e.g., 10)

        // Create a new user document
        const formdata = new Newuserschema({
            fname,
            lname,
            password: hashedPassword,
            email,
            profile
        });

        // Save the new user data to the database
        await formdata.save();

        // Send a welcome email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'technicalhubdriverready@gmail.com',
                pass: 'aqlp joww mqgk fmbw'
            }
        });
        const source = fs.readFileSync('public/mail_templates/welcomemail.hbs', 'utf8');
        const template = handlebars.compile(source);
        const Name = `${fname} ${lname}`;
        const html = template({ Name });
        const mailOptions = {
            from: 'technicalhubdriverready@gmail.com',
            to: email,
            subject: 'Welcome To ASTE',
            html: html
        };
        await transporter.sendMail(mailOptions);
        
        // Respond with a success message
        return res.send({ msg: 'Your Account Was Created, You Will Be Redirected To Login Page' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default Addnewuser;
