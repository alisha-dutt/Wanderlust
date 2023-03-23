const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => {
    let messages = req.session.messages?.message;
    // clear session error msg
    req.session.messages = [];

    res.render('auth/register', { 
        title: 'Register',
        messages: messages,
        user: req.user
    });
});

router.post('/register', (req, res) => {
    User.register(new User({
            username: req.body.username
        }), req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                req.session.messages = err;
                res.redirect('/auth/register');
            }
            else {
                res.redirect('/destination');
            }
        });
});

router.get('/login', (req, res) => {
    let messages = req.session.messages;
    req.session.messages = [];

    res.render('auth/login', { 
        title: 'Login',
        messages: messages,
        user: req.user
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/destination',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}));

router.get('/logout', (req, res) => {
    req.session.messages = [];
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/');
    })
})

module.exports = router;