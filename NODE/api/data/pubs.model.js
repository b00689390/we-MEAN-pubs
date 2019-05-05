var mongoose = require('mongoose');

var votesSchema = new mongoose.Schema( {
    like : Number,
    dislike : Number
});

var reviewSchema = new mongoose.Schema( {
    username : String,
    votes : votesSchema,
    text : String,
    stars : Number,
    date : {
        type : Date,
        default : Date.now
    }
});

var pubSchema = new mongoose.Schema( {
    
    longitude : Number,
    latitude : Number,
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    postcode : String,
    town : String,
    type : String,
    reviews : [reviewSchema],
    review_count : Number
});

mongoose.model('Pub', pubSchema, 'pubs');