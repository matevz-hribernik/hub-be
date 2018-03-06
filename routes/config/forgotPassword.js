/**
 * Created by Administrator on 6.5.2016.
 */
var nodemailer = require('nodemailer');

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: 'sensorssend@hotmail.com',
        pass: '1sensorsIOSapp'
    },
    logger: false, // log to console
    debug: false // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'Sensors <sensorssend@hotmail.com>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});

console.log('SMTP Configured');
exports.newPwd = function(email, password){

// Message object
    var message = {

        // Comma separated list of recipients
        to: ' <' + email+ '>',

        // Subject of the message
        subject: 'New Password', //

        // plaintext body
        text: 'Your new password is ' + password

    };

    console.log('Sending Mail');

    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
    });
};