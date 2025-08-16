const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('./schema.js');

module.exports.validateListing = (req, res, next) => {
    // If there's a file upload, add the image data to req.body
    if (req.file) {
        if (!req.body.listing) {
            req.body.listing = {};
        }
        req.body.listing.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    } else {
        // For edit operations (PUT method), image is optional
        // For create operations (POST method), image is required if not provided
        const isEditOperation = req.method === 'PUT';
        
        if (!isEditOperation && (!req.body.listing || !req.body.listing.image)) {
            throw new ExpressError("listing.image is required", 400);
        }
    }
    
    const result = listingSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.details[0].message, 400);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.details[0].message, 400);
    }
    next();
};

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        //Save Redirect URL 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.author.equals(res.locals.currentUser._id)){
        req.flash("error", "You are not authorized to edit this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error", "You are not authorized to make changes to this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}