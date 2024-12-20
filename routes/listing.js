const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

//index route
//create route
//combine two routes
router.route("/")
.get(asyncWrap (listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),
validateListing,
asyncWrap(listingController.create)
);
//filter
router.get("/filter/:q",asyncWrap(listingController.filter));

//Search
router.get("/search", asyncWrap(listingController.search));

//new route
router.get("/new",isLoggedIn,listingController.new)

//combine 3 routes
//show route
//delete route
router.route("/:id")
.get(asyncWrap(listingController.show))
.put(isLoggedIn,isOwner,
upload.single('listing[image]'),
validateListing,asyncWrap (listingController.update))
.delete( isLoggedIn,isOwner,asyncWrap(listingController.delete)
)


//edit route
router.get("/:id/edit", isLoggedIn, isOwner,asyncWrap(listingController.edit)
);


module.exports = router;


// <% if(currUser && currUser._id.equals(listing.owner._id)) { %> 
// <% } %>