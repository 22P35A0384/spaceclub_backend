import Newuserschema from '../models/newuser.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import handlebars from 'handlebars';

// Function to upload file to GitHub
async function uploadToGitHub(filePath, accessToken, repoOwner, repoName) {
    const content = fs.readFileSync(filePath, { encoding: 'base64' });
    const apiUrl = `https://api.github.com/repos/22P35A0384/${spaceclub_backend}/contents/public/profile`;

    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${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}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Upload file',
            content: content.toString('base64')
        })
    });

    if (response.ok) {
        console.log('File uploaded to GitHub successfully');
    } else {
        console.error('Failed to upload file to GitHub:', await response.text());
    }
}

const Addnewuser = async (req, res, next) => {
    const profile = (req.file) ? req.file.filename : null;
    const { fname, lname, password, email } = req.body;
    const hashedPassowrd = bcrypt.hashSync(password);
    const formdata = new Newuserschema({
        fname,
        lname,
        password: hashedPassowrd,
        email,
        profile
    });
    try {
        await formdata.save();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'technicalhubdriverready@gmail.com',
                pass: 'aqlp joww mqgk fmbw'
            }
        });
        const source = fs.readFileSync('public/mail_templates/welcomemail.hbs', 'utf8');
        const template = handlebars.compile(source);
        const Name = fname + " " + lname;
        const html = template({ Name });
        var mailOptions = {
            from: 'technicalhubdriverready@gmail.com',
            to: email,
            subject: 'Welcome To ASTE',
            html: html
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Upload profile photo to GitHub
        const filePath = `public/profiles/${profile}`;
        const accessToken = 'YOUR_GITHUB_ACCESS_TOKEN';
        const repoOwner = 'repo_owner';
        const repoName = 'repo_name';

        await uploadToGitHub(filePath, accessToken, repoOwner, repoName);

        return res.send({ msg: 'Your Account Was Created, You Will Be Redirected To Login Page' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default Addnewuser;
