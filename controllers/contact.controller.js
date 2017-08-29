const nodemailer = require('nodemailer');
const config = require('../config');

exports.index = (req, res, next) => {
        res.render('contact/index', { 
            title: 'Contact Us',
        });
};

exports.send = (req, res, next) => {
    
    let transporter = nodemailer.createTransport({
        // host: config.get('transport:host'),
        // port: config.get('transport:port'),
        // secure: config.get('transport:secure'),
        service: "Gmail",
        auth: {
            user: config.get('transport:user'),
            pass: config.get('transport:pass')
        }
    });

    let mailOptions = {
        from: "'"+req.body.name+"<"+req.body.email+">'",
        to: 'janusnic@gmail.com',
        subject: req.body.subject,
        text: 'You have a new submission with the following details... ' + req.body.message,
        html: '<p>You have a new submission with the following details... ' + req.body.message + '</p>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        res.redirect('/contact/success');   
    });
};
