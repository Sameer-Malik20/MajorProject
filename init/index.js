if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = "mongodb://127.0.0.1:27017/wonderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(mongoUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '675969028720d5ad4640315b'}));
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDB();