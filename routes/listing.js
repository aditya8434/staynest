const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isAuthor, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
    .get(wrapAsync(listingController.index))   //INDEX ROUTE
    .post(isLoggedIn, upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.createListing))    //CREATE NEW LISTING ROUTE

//NEW LISTING ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))                                  //SHOW INDIVIDUAL LISTING ROUTE
    .put(isLoggedIn, isAuthor, upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.updateListing))    //UPDATE LISTING ROUTE
    .delete(isLoggedIn, isAuthor, wrapAsync(listingController.deleteListing));          //DELETE LISTING ROUTE

//EDIT LISTING ROUTE
router.get("/:id/edit", isLoggedIn, isAuthor, wrapAsync(listingController.renderEditForm));




module.exports = router;

