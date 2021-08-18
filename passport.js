const passport =require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//defining all the necessary functions from passport
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback   : true
    },
    (request, accessToken, refreshToken, profile, done)=> {
        //here also we can save the all the important tokens in a file that can be used for sending email
            return done(null, profile);
    }
));

module.exports = passport;