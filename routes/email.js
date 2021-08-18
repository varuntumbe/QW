const express = require('express');
const mailSend = require('../mailutil');

const router = express.Router();

router.route('/sendmail').get((req,res)=> {
    mailSend();
    res.send('Email sending process is started ...');
});

module.exports = router;