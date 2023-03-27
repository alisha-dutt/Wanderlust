const Destination = require('../models/destinations');
const City = require('../models/city');
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Display list of all destinations.
router.get('/', (req, res) => {
  // get data from mongodb using the Employer model
  Destination.find((err, destinations) => {
      if (err) {
          console.log(err)
      }
      else {
          console.log(destinations);
          res.render('destinations/index', {
              title: 'Destination List',
              destinations: destinations,
              user: req.user
          });
      }
  });
});
/* GET /create - display form to add a place */
// router.get('/create', global.isAuthenticated, (req, res) => {
  router.get('/create', (req, res) => {
  // use City model to fetch list of cities from db to populate city dropdown
  City.find((err, cities) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render('destinations/create', {
              cities: cities,
              title: 'Enter a new Destination',
              user: req.user
          });
      }
  }).sort('name');    
});

/* POST /create - submit form data to mongodb */
// router.post('/create', global.isAuthenticated, (req, res) => {
  router.post('/create', (req, res) => {
    Destination.create(req.body, (err, newDocument) => {
      if (err) {
          console.log(err);
      }
      else {
          res.redirect('/destinations');
      }
  });
});

/* GET /delete/abc123 => delete selected destination document using the url param.  : indicates param */
// router.get('/delete/:_id', global.isAuthenticated, (req, res) => {
  router.get('/delete/:_id', (req, res) => {
  Destination.remove({ _id: req.params._id }, (err) => {
      if (err) {
          console.log(err);
      }
      else {
          res.redirect('/destinations');
      }
  });
});

/* GET /edit/abc123 => fetch & display selected destinations */
// router.get('/edit/:_id', global.isAuthenticated, (req, res) => {
  router.get('/edit/:_id', (req, res) => {
  Destination.findById(req.params._id, (err, destinations) => {
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
                      title: 'Edit Destination Details',
                      cities: cities,
                      user: req.user
                  });
              }
          }).sort('name');               
      }
  });
});

/* POST /edit/abc123 => update seleted destinations */
// router.post('/edit/:_id', global.isAuthenticated, (req, res) => {
  router.post('/edit/:_id',(req, res) => {
  Destination.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err) => {
      if (err) {
          console.log(err);
      }
      else {
          res.redirect('/destinations');
      }
  });
});


module.exports = router;