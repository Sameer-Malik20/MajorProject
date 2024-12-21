const { response } = require("express");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;


//index route
module.exports.index = async (req,res) => {
    const listings = await Listing.find();
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
}

//new route
module.exports.new = (req,res) =>{
    res.render("listings/new.ejs")
}

//show route
module.exports.show = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
    populate:{
        path: "author",
    },
    }) 
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you request for does not exist");
        res.redirect("/listings");
    }

    
    res.render("listings/show.ejs",{listing});
}


// module.exports.create = async (req, res, next) => {
//     try {
//       console.log("Request Body:", req.body);
//       console.log("Uploaded File:", req.file);
  
//       if (!req.file) {
//         console.log("No file uploaded");
//       }
  
//       let url = req.file ? req.file.path : null;
//       let filename = req.file ? req.file.filename : null;
  
//       // Ensure all necessary fields exist
//       if (!req.body.listing || !req.body.listing.title || !req.body.listing.price) {
//         console.log("Missing required fields in request body.");
//         req.flash("error", "Required fields are missing!");
//         return res.redirect("/listings/new");
//       }
  
//       // Create new listing
//       const newListing = new Listing(req.body.listing);
//       newListing.owner = req.user._id;
  
//       // Only add image if file exists
//       if (url && filename) {
//         newListing.image = { url, filename };
//       }
  
//       // Save the listing
//       let savedListing = await newListing.save();
//       console.log("Saved Listing:", savedListing);
  
//       req.flash("success", "New Listing Created");
//       res.redirect("/listings");
//     } catch (err) {
//       console.error("Error during listing creation:", err);
//       req.flash("error", "Something went wrong while creating the listing.");
//       res.redirect("/listings/new");
//     }
//   };
  
  module.exports.create = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}
//create route
// module.exports.create = async (req, res, next) => {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     console.log('Body:', req.body);
// console.log('File:', req.file);

//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename };
//     let savedListing = await newListing.save();
//     console.log(savedListing);
    
//     req.flash("success", "New Listing Created");
//     res.redirect("/listings");
// }

//edit route
module.exports.edit = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you request for does not exist");
        res.redirect("/listings");
    }
    let originalImgUrl = listing.image.url;
    originalImgUrl.replace("/upload", "/upload/h_250,w_250");
    res.render("listings/edit.ejs",{listing,originalImgUrl});
}

//update route
module.exports.update = async (req,res) => {
    let { id } = req.params;
    // let coordinate = await geocodingClient.forwardGeocode({
    //     query: `${req.body.listing.location},${req.body.listing.country}`,
    //     limit: 2
    // })
    //   .send();

    // req.body.listing.geometry = coordinate.body.features[0].geometry;

     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
if(typeof req.file !== "undefined"){//agar file exist karti hai
     let url = req.file.path;
     let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
}
     req.flash("success", "Listing Updated");
     res.redirect(`/listings/${id}`);
}

//filter listing
module.exports.filter = async (req, res, next) => {
    try {
        const { q } = req.params;
        console.log("Filter parameter received:", q);

        const filteredListings = await Listing.find({ category: q }).exec();
        console.log("Filtered Listings:", filteredListings);

        if (!filteredListings.length) {
            req.flash("error", "No Listings exists for this filter!");
            return res.redirect("/listings");
        }

        res.locals.success = `Listings Filtered by ${q}`;
        return res.render("listings/index.ejs", { allListings: filteredListings });
    } catch (err) {
        console.error("Error in filter route:", err);
        req.flash("error", "Something went wrong!");
        return res.redirect("/listings");
    }
};


//delete route
module.exports.delete = async (req,res) => {
    let {id} = req.params;
    let deletedLis = await Listing.findByIdAndDelete(id);
    console.log(deletedLis);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};

module.exports.search = async(req, res) => {
    console.log(req.query.q);
    let input = req.query.q.trim().replace(/\s+/g, " "); //remove start and end space
    console.log(input);
    if(input == "" || input == " "){
        //search value is empty
        req.flash("error", "Search value empty!!!");
        res.redirect("/listings");
    }

    //convert every word first letter capital and other small
    let data = input.split("");
    let element = "";
    let flag = false;
    for(let index = 0; index < data.length; index++) {
        if (index == 0 || flag) {
            element = element + data[index].toUpperCase();
        } else {
            element = element + data[index].toLowerCase();
        }
        flag = data[index] == " ";
    }
    console.log(element);

    let allListings = await Listing.find({
        title: { $regex: element, $options: "i"},
    });
    if(allListings.length !=0 ){
        res.locals.success = "Listings searched by title";
        res.render("listings/index.ejs", {allListings});
        return;
    }
    if(allListings.length == 0){
        allListings = await Listing.find({
            category: { $regex: element, $options: "i"},
        }).sort({_id: -1});
        if(allListings.length != 0) {
            res.locals.success = "Listings searched by category";
            res.render("listings/index.ejs", {allListings});
            return;
        }
    }
    if(allListings.length == 0) {
        allListings = await Listing.find({
            country: { $regex: element, $options: "i"},
        }).sort({_id: -1});
        if(allListings.length != 0) {
            res.locals.success = "Listings searched by country";
            res.render("listings/index.ejs", {allListings});
            return;
        }
    }
    if(allListings.length == 0) {
        allListings = await Listing.find({
            location: { $regex: element, $options: "i"},
        }).sort({_id: -1});
        if(allListings.length != 0) {
            res.locals.success = "Listings searched by location";
            res.render("listings/index.ejs", {allListings});
            return;
        }
    }

    const intValue = parseInt(element, 10); //10 for decimal return - int ya NaN
    const intDec = Number.isInteger(intValue); //check intValue is number or not

    if(allListings.length == 0 && intDec) {
        allListings = await Listing.find({ price: { $lte: element }}).sort({
            price: 1,
        });
        if(allListings.length != 0) {
            res.locals.success = `Listings searched for less than Rs ${element}`;
            res.render("listings/index.ejs", { allListings });
            return;
        }
    }
    if(allListings.length == 0) {
        req.flash("error", "Listings is not here !!!");
        res.redirect("/listings");
    }
}