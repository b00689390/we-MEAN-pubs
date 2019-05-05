var mongoose = require('mongoose');
var Pub = mongoose.model('Pub');

module.exports.reviewsGetAll = function(req, res) {
    var pubID = req.params.pubID;
    var start = 0;
    var number = 3;
    var maxNumber = 6;

    if (req.query && req.query.start) { 
        start = parseInt(req.query.start);
    }
    if (req.query && req.query.number) { 
        number = parseInt(req.query.number);
    }

    if (isNaN(start) || isNaN(number)) {
        res
            .status(400)
            .json( {"message" : "If supplied in querystring, start and number must be numeric"});
        return;
    }

    if (number > maxNumber) {
        res
            .status(400)
            .json( {"message" : "Maxvalue for number is " + maxNumber});
        return;
    }
    console.log("GET reviews for pub" + pubID);
    Pub
            .findById( pubID)
            .select( "reviews" )
            .exec(function(err, doc) {
                console.log("Found pub " + pubID);
                res
                    .status(200)
                    .json(doc.reviews);
            });
};

module.exports.reviewsGetOne = function(req, res) {
    var pubID = req.params.pubID;
    var reviewID = req.params.reviewID;
    console.log("GET reviewID " + reviewID + "for pubID" + pubID);
    Pub
            .findById(pubID)
            .select( "reviews" )
            .exec(function(err, thisPub) {
                var response = {
                    status : 200,
                    message : {}
                };
                if (err) {
                    console.log("Error finding pub");
                    response.status = 500;
                    response.message = err;
                } else if (!thisPub) {
                    console.log("Pub ID not found in database", id);
                    response.status = 404;
                    response.message = {
                        "message" : "Pub ID not found" + id
                    };
                } else {
                     response.message = thisPub.reviews.id(reviewID);
                     if (!response.message) {
                         response.status = 404;
                         response.message = {
                             "message" : "Review ID not found " + reviewID
                         };
                     }
                }
                res
                    .status(response.status)
                    .json(response.message);
            });
};

var addReview = function(req, res, thisPub) {
    thisPub.reviews.push( {
        username : req.body.username,
        text : req.body.text,
        stars : parseInt(req.body.stars)
    });

    thisPub.save(function(err, updatedPub) {
        var newReviewPostition = updatedPub.reviews.length - 1;
        var newReview = updatedPub.reviews[newReviewPostition];
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(newReview);
        };
    });
};

module.exports.reviewsAddOne = function(req, res) {
    var pubID = req.params.pubID;
    console.log("GET reviews for pub " + pubID);

    Pub
        .findById( pubID )
        .select( "reviews" )
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            };
            if (err) {
                console.log("Error finding pub");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {"message" : "Pub ID not found" + pubID};
            };
            if (doc) {
                addReview(req, res, doc);
            } else{
                console.log("Found pub " + pubID);
                res
                    .status(response.status)
                    .json(response.message);
                }
        }); 
};

module.exports.reviewsUpdateOne = function(req, res) {
    var pubID = req.params.pubID;
    var reviewID = req.params.reviewID;
    console.log("GET reviewID " + reviewID + "for pubID" + pubID);
    Pub
            .findById(pubID)
            .select( "reviews" )
            .exec(function(err, thisPub) {
                var response = {
                    status : 200,
                    message : {}
                };
                if (err) {
                    console.log("Error finding pub");
                    response.status = 500;
                    response.message = err;
                } else if (!thisPub) {
                    console.log("Pub ID not found in database", id);
                    response.status = 404;
                    response.message = {
                        "message" : "Pub ID not found" + id
                    };
                } else {
                     thisReview = thisPub.reviews.id(reviewID);
                     if (!thisReview) {
                         response.status = 404;
                         response.message = {
                             "message" : "Review ID not found " + reviewID
                         };
                     }
                }
                if (response.status != 200) {
                    res
                        .status(response.status)
                        .json(response.message);
                } else {
                    thisReview.username = req.body.username;
                    thisReview.text = req.body.text;
                    thisReview.stars = parseInt(req.body.stars);
                    thisPub.save(function(err, updatedPub) {
                        if (err) {
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json();
                        }
                    });
                }
            });
};

module.exports.reviewsDeleteOne = function(req, res) {
    var pubID = req.params.pubID;
    var reviewID = req.params.reviewID;
    console.log("GET reviewID " + reviewID + "for pubID" + pubID);
    Pub
            .findById(pubID)
            .select( "reviews" )
            .exec(function(err, thisPub) {
                var response = {
                    status : 200,
                    message : {}
                };
                if (err) {
                    console.log("Error finding pub");
                    response.status = 500;
                    response.message = err;
                } else if (!thisPub) {
                    console.log("Pub ID not found in database", id);
                    response.status = 404;
                    response.message = {
                        "message" : "Pub ID not found" + id
                    };
                } else {
                     thisReview = thisPub.reviews.id(reviewID);
                     if (!thisReview) {
                         response.status = 404;
                         response.message = {
                             "message" : "Review ID not found " + reviewID
                         };
                     }
                }
                if (response.status != 200) {
                    res
                        .status(response.status)
                        .json(response.message);
                } else {
                    thisPub.reviews.id(reviewID).remove();
                    thisPub.save(function(err, updatedPub) {
                        if (err) {
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json();
                        }
                    });
                }
            });
};

