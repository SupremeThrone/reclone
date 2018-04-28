const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        require: true
    },
    image:{
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    room: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        },
        room: String
    }
});

module.exports = mongoose.model("Post", postSchema);