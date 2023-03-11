const mongoose = require("mongoose");


const videoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,

    },
    video_url: {
        type: String,
        required: true,
    },
    upload_date: {
        type: Date,
        required: true,
        default: new Date()

    },
    likes: {
        type: Number,
        required: true,
        default: 0

    },
    views: {
        type: Number,
        required: true,
        default: 0

    }



})

// Method to check the entered password is correct or not 

const Video = mongoose.model('videos', videoSchema)
module.exports = Video