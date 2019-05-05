var mongoose = require('mongoose');
var Pub = mongoose.model('Pub');

var runGeoQuery = function (req, res) {
    var lng = parseFloat(req.query.longitude);
    var lat = parseFloat(req.query.latitude);

    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance: 10000,
        num: 5
    };

    Pub
        .geoNear(point, geoOptions,
            function (err, results, stats) {
                console.log("Geo stats: ", stats);
                res
                    .status(200)
                    .json(results);
            });
}

module.exports.pubsAll = function (req, res) {

    Pub
        .find()
        .exec(function (err, docs) {
            if (err) {
                console.log("Error finding pubs");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Retrieved data for " + docs.length + " pubs");
                res
                    .status(200)
                    .json(docs.length);
            }
        })

}

module.exports.pubsGetAll = function (req, res) {

    Pub
        .find()
        .exec(function (err, docs) {
            if (err) {
                console.log("Error finding pubs");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Retrieved data for " + docs.length + " pubs");
                res
                    .status(200)
                    .json(docs);
            }
        })

}

module.exports.pubsGetOne = function (req, res) {
    var pubID = req.params.pubID;
    console.log("GET pub" + pubID);
    Pub
        .findById(pubID)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message": "Pub ID not found" };
            }
            console.log("Found pub " + pubID);
            res
                .status(response.status)
                .json(response.message);
        });
}

var splitArray = function (input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    };
};

module.exports.pubsAddOne = function (req, res) {

    Pub
        .create({
            // new object to be added
            name: req.body.name,
            address: req.body.address,
            postcode: req.body.postcode,
            town: req.body.town,
            type: req.body.type,
            longitude: parseInt(req.body.longitude),
            latitude: parseInt(req.body.latitude),
            review_count: 0
        }, function (err, newPub) {
            if (err) {
                console.log("Error creating pub");
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(newPub);
            }
        });
}

module.exports.pubsUpdateOne = function (req, res) {
    var pubID = req.params.pubID;
    console.log("GET pub" + pubID);
    Pub
        .findById(pubID)
        .select("-reviews")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message": "Pub ID not found" };
            }
            console.log("Found pub " + pubID);
            if (response.status != 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.address = req.body.address;
                doc.postcode = req.body.postcode;
                doc.town = req.body.town;
                doc.type = req.body.type;
                doc.longitude = parseInt(req.body.longitude);
                doc.latitude = parseInt(req.body.latitude);
                doc.save(function (err, updatedPub) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    };
                });
            };
        });
}

module.exports.pubsDeleteOne = function (req, res) {
    var pubID = req.params.pubID;

    Pub
        .findByIdAndRemove(pubID)
        .exec(function (err, thisPub) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Pub " + pubID + " deleted");
                res
                    .status(204)
                    .json();
            };
        });
}