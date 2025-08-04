const Listing = require('../models/listing.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//INDEX ROUTE
module.exports.index = async (req, res) => {
    const listings = await Listing.find();
    res.render("listings/index.ejs", { listings });
};

//NEW LISTING ROUTE
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

//CREATE NEW LISTING ROUTE
module.exports.createListing = async (req, res) => {
    //Geocoding
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
        .send()


    const newListing = new Listing(req.body.listing);
    newListing.author = req.user._id;
    
    // Handle image upload if file is provided
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { filename, url };
    }
    newListing.geometry = response.body.features[0].geometry;


    let savedListing = await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

//SHOW INDIVIDUAL LISTING ROUTE
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if(!listing){
        req.flash("error", "Listing you requested for doesn't exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};


//EDIT LISTING ROUTE
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for doesn't exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    let updatedImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, updatedImageUrl });
};

//UPDATE LISTING ROUTE
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { filename, url };
        await listing.save();
    }
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

//DELETE LISTING ROUTE
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};