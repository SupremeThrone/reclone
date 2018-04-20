

const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

//User schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    username: {
        type: String,
        required: true 
    },
     password: {
        type: String,
        
    },
});

UserSchema.plugin(passportLocalMongoose);
const User = module.exports = mongoose.model("User", UserSchema);