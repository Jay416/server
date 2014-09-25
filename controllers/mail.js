var fs = require('fs');
var ejs = require('ejs');
var async = require('async');
var nodemailer = require("nodemailer");

// var smtpTransport = nodemailer.createTransport("SMTP", {
//     transport: "SMTP",
//     host: "smtp.mail.com",
//     port: 587,
//     requiresAuth: true,
//     auth: {
//         user: "jinc@dr.com",
//         pass: "j456135641"
//     }
// });

var smtpTransport = nodemailer.createTransport("SMTP", {
  	service: "Mail.Ru",
    auth: {
        user: "j.blackbird@mail.ru",
        pass: "FM&LtoyT56r35a41x"
    }
});


module.exports = {
	send: function (req, res, next) {

		var mailText = 'Lorem ipsum dolor sit amet.';

		async.waterfall([
			function (callback) {
				fs.readFile('views/mail.ejs', {encoding: 'utf-8'}, callback);
			},
			function (data, callback) {
				callback(null, ejs.render(data,{text: mailText}));
			},
			function (mailHtml, callback) {
				var mailOptions = {
				    from: "j.blackbird@mail.ru", // sender address
				    to: "evelredcat@mail.ru", // list of receivers
				    subject: "Hello ✔", // Subject line
				    text: mailText, // plaintext body
				    html: mailHtml // html body
				};
				smtpTransport.sendMail(mailOptions, callback);
			}
		],	
			function (err, response) {
					if(err) next(err);
				    res.send(response);
			}
		);

		
		
	}
}