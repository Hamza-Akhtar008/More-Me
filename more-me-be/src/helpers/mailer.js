const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		// type: 'OAuth2',
		user: 'awaischaudhary9870@gmail.com',
		pass: 'pybdhhumiberiaez',
		// clientId: process.env.OAUTH_CLIENTID,
		// clientSecret: process.env.OAUTH_CLIENT_SECRET,
		// refreshToken: process.env.OAUTH_REFRESH_TOKEN
	}
});


export const sendEMail = (sender_email, receiver_email, email_subject, email_body) => {
	const data = {
		"from": sender_email,
		"to": receiver_email,
		"subject": email_subject,
		"text": email_body
	};

	transporter.sendMail(data, (error, info) => {
		if (error) {
			console.log('Error sending email:', error);
		} else {
			console.log('Email sent:', data ,info.response);
		}
	})
}