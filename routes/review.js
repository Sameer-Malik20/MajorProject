const express = require("express");
const router = express.Router({mergeParams:true});
const asyncWrap = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Reviews
//Post Route
router.post("/", 
    isLoggedIn,
    validateReview,
    asyncWrap(reviewController.createReview));

//delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isAuthor,
    asyncWrap(reviewController.deleteReview)
);


module.exports = router;