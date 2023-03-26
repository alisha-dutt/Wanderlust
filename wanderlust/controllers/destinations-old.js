const Destination = require('../models/destinations');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('picture');

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
// Display list of all destinations.
exports.index = function(req, res) {
  Destination.find()
    .exec(function(err, list_destinations) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render('destinations/index', { title: 'Destinations', destination_list: list_destinations });
    });
};

// Display detail page for a specific destination.
exports.detail = function(req, res) {
  Destination.findById(req.params.id)
    .exec(function(err, destination) {
      if (err) {
        return next(err);
      }
      if (destination == null) { // No results.
        var err = new Error('Destination not found');
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render('destinations/detail', { title: 'Destination Details', destination: destination });
    });
};

// Display destination create form on GET.
exports.create_get = function(req, res) {
  res.render('destinations/create', { title: 'Create Destination' });
};

// Handle destination create on POST.
exports.create_post = function(req, res, next) {
  // Call upload function to process the image upload
  upload(req, res, function(err) {
    if (err) {
      return res.render('destinations/create', { title: 'Create Destination', error: err });
    } else {
      const destination = new Destination({
        name: req.body.name,
        city: req.body.city,
        comments: req.body.comments,
        picture: req.file.filename
      });

      destination.save((err) => {
        if (err) {
          return next(err);
        }

        res.redirect('/destinations');
      });
    }
  });
};

// Display destination delete form on GET.
exports.delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Destination delete GET');
};

// Handle destination delete on POST.
exports.delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Destination delete POST');
};

// Display destination update form on GET.
exports.update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Destination update GET');
};

// Handle destination update on POST.
exports.update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Destination update POST');
};
