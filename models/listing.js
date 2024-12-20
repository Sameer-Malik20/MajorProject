const mongoose = require("mongoose");
const Review = require("./reviews");
const { type } = require("express/lib/response");
const { required } = require("joi");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: String,
    description: String,
    image: {
      url: String,
      filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type:Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    geometry: {
      type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
      },
      coordinates: {
          type: [Number],
          
      }
  },
  category: {
      type: String,
      enum: ["Rooms", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"],
     
  }
});



listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}})
  }
})

const listing = mongoose.model("Listing",listingSchema);
module.exports = listing;