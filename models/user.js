const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");//ye salt and hash khud se add kar dega


const userSchema = new Schema({
    email: {
        type: String,
        required:true
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);