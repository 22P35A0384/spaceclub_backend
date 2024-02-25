import Newuserschema from '../models/newuser.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import handlebars from 'handlebars';
import fetch from 'node-fetch';

// Function to upload file to GitHub
async function uploadToGitHub(filePath, accessToken, repoOwner, repoName) {
    try {
        // Read file content
        const content = fs.readFileSync(filePath, { encoding: 'base64' });

        // Construct GitHub API URL
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

        // Make HTTP request to upload file to GitHub
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${accessToken}`,
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
    } catch (error) {
        console.error('Error uploading file to GitHub:', error);
    }
}

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

        // Upload profile photo to GitHub
        const filePath = `public/profiles/${profile}`;
        const accessToken = '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';
        const repoOwner = '22P35A0384';
        const repoName = 'spaceclub_backend';

        await uploadToGitHub(filePath, accessToken, repoOwner, repoName);

        return res.send({ msg: 'Your Account Was Created, You Will Be Redirected To Login Page' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default Addnewuser;
