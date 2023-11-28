var nodemailer = require('nodemailer');
require("dotenv").config()

let mail = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    }
});

module.exports = mail;