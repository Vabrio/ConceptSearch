'use strict';
const nodemailer = require('nodemailer');

let transporter:any = null;

function initmail(){
	// create reusable transporter object using the default SMTP transport
	transporter = nodemailer.createTransport({
		host: 'concept-search.org',
		port: 587,
		secure: false,
		auth: {
			user: "contact", // generated ethereal user
			pass: "uabttH4" // generated ethereal password
		},
		tls: {
			// do not fail on invalid certs
			rejectUnauthorized: false
		}
	});
	transporter.verify(function(error:any, success: any) {
	   if (error) {
			console.log(error);
	   } else {
			console.log('Server is ready to take our messages');
	   }
	});
}

function sendmail(email: string, subject: string, content: string){
	// setup email data with unicode symbols
	let mailOptions = {
		from: '"Nathanaël" <contact@concept-search.org>', // sender address
		to: email, // list of receivers
		subject: subject, // Subject line
		text: content, // plain text body
		/*html: '<b>Hello world?</b>' // html body*/
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error: any, info: any) => {
		if (error) {
			return console.log(error);
		}
	});
}

export {initmail, sendmail}