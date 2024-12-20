const Listing = require("../models/listing");
const Review = require("../models/reviews");

//create route
module.exports.createReview = async (req,res) => {
    let listing  = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)
    listing.reviews.push(newReview)
    newReview.author = req.user._id;
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);   
}

//delete route
module.exports.deleteReview = async (req,res) => {
    let {id,reviewId} =  req.params;

    Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}


