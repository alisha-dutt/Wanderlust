const express = require('express');
const router = express.Router();


// use destinations model for CRUD w/mongoose
const destinations = require('../models/destinations');

// global auth check to make most methods private
const global = require('../controllers/globalFunctions');

/* GET destinations index (the module home page) */
router.get('/', (req, res) => {

    // get data from mongodb using the destinations model
    destinations.find((err, destinations) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(destinations);
            res.render('destinations/index', {
                title: 'destinations List',
                destinations: destinations,
                user: req.user
            });
        }
    });
});

/* GET /create - display form to add an destinations */
// injected our auth check function as middleware for security
router.get('/create', global.isAuthenticated, (req, res) => {
    // use City model to fetch list of cities from db to populate city dropdown
    City.find((err, cities) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('destinations/create', {
                cities: cities,
                title: 'Create a New destinations',
                user: req.user
            });
        }
    }).sort('name');    
});

/* POST /create - submit form data to mongodb */
router.post('/create', global.isAuthenticated, (req, res) => {
    destinations.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/destinations');
        }
    });
});

/* GET /delete/abc123 => delete selected destinations document using the url param.  : indicates param */
router.get('/delete/:_id', global.isAuthenticated, (req, res) => {
    destinations.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/destinations');
        }
    });
});

/* GET /edit/abc123 => fetch & display selected destinations */
router.get('/edit/:_id', global.isAuthenticated, (req, res) => {
    destinations.findById(req.params._id, (err, destinations) => {
        if (err) {
            console.log(err);
        }
        else {
            City.find((err, cities) => {
                if (err) {
                    console.log(err);
                }
                else {
                     res.render('destinations/edit', {
                        destinations: destinations,
                        title: 'Edit destinations Details',
                        cities: cities,
                        user: req.user
                    });
                }
            }).sort('name');               
        }
    });
});

/* POST /edit/abc123 => update seleted destinations */
router.post('/edit/:_id', global.isAuthenticated, (req, res) => {
    destinations.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/destinations');
        }
    });
});


// make public
module.exports = router;