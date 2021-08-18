//importing all the packages
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();

const authRouter = require('./routes/auth');
const mailRouter = require('./routes/email');

require('./passport');

//setting all the app level middlewares
app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

//index page
app.get("/", (req, res) => {
    res.json({message: "Welcome"});
})

//binding the router instances to specific routes
app.use("/auth",authRouter);
app.use("/mail",mailRouter);

require('./routes/auth');
module.exports = app;