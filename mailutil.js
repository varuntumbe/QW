const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

//defining an oauth2.0 client with client_Id and client_secret 
const oauth2Client = new OAuth2(
     process.env.CLIENT_ID,
     process.env.CLIENT_SECRET, 
     "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
     refresh_token: process.env.CLIENT_RFT
});

//as access tokens gets changed for every 3600 secs call the next method get the accesstoken
const accessToken = oauth2Client.getAccessToken();

//defining necessary methods of nodemailer to send mail
const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: process.env.EMAIL, 
          clientId: process.env.CLIENT_ID,
          clientSecret:  process.env.CLIENT_SECRET,
          refreshToken: process.env.CLIENT_RFT,
          accessToken: accessToken
     },
     tls: {
     rejectUnauthorized: false
     }
});


const mailOptions = {
     from: process.env.EMAIL,
     to: process.env.OTHER_EMAIL,
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>Invitation for the Interview</b>"
};



const mailSend = ()=>{
    //calling the sendmail of smtpTransport
    smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
     console.log('email has been sent');
});

}

module.exports = mailSend;