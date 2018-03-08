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

function sendmail(email: string, subject: string, content: string, contentHTML: string){
	// setup email data with unicode symbols
	let mailOptions = {
		from: '"Nathanaël" <contact@concept-search.org>', // sender address
		to: email, // list of receivers
		subject: subject, // Subject line
		html: contentHTML, // plain text body
		text:  content// html body*/
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error: any, info: any) => {
		if (error) {
			return console.log(error);
		}
	});
}

function userinitmail(uuid: string, email: string){
	var subject = "Verify email request";
	var address = "https://concept-search.org:8080/users/verify?secret="+uuid;
	var content =  "This is an automatic mail from Concept Search. Please do not reply.\n\nTo verify your email, please copy the link below your browser :\r\n"+address+"\r\n\r\nWith our kindest regards,\r\nThe ConceptSearch team";
	var contentHTML = "<p>This is an automatic mail from Concept Search. Please do not reply.<br><br>To verify your email, please click on the link below or copy it in your browser : <br> <a href='"+address+"'>"+address+"</a><br><br>With our kindest regards,<br><i>The ConceptSearch team</i></p>";
	sendmail(email, subject, content, contentHTML);
}

export {initmail, sendmail, userinitmail}