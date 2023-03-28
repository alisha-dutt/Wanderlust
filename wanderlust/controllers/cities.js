const express = require('express');
const router = express.Router();
const City = require('../models/city.js');


// Display all Cities
router.get('/', (req, res) => {
    City.find((err, cities) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(cities);
            res.render('cities/index', {
                title: 'Cities List',
                cities: cities,
                user: req.user
            });
        }
    });
  });


// GET: /cities/create 
router.get('/create', (req, res) => {
    res.render('cities/create', {
       user: req.user 
    });
});

// POST: /cities/create
router.post('/create', (req, res) => {
    City.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

module.exports = router;