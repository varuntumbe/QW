const express = require('express');
const { writeFile } = require('fs');
const passport = require('../passport');

const router = express.Router();

//custom middlware to check whether use is logged in or not
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
 }

// defining all the routes
router.route("/failed").get((req, res) => {
    res.send("Failed");
});

router.route("/success").get(isLoggedIn, (req, res) => {
    writeFile('./emailDetails.txt',JSON.stringify(req.user),(err,data)=>{
        if(err){
            console.log(err);
        }
        else
            console.log('Email Details saved successfully');
    })
    res.send(`Welcome ${req.user.emails[0].value}`)
})

router.route("/google").get(
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

router.route("/google/callback").get(
    passport.authenticate('google', {
        failureRedirect: '/failed',
        successRedirect:'/success'
    })
);

router.route("/logout").get((req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

module.exports = router;