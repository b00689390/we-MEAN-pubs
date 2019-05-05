var express = require ('express');
var router = express.Router();

var pubsController = require('../controllers/pubs.controllers.js');
var reviewsController = require('../controllers/reviews.controllers.js');

router
    .route('/pubsLength')
    .get(pubsController.pubsAll);

router 
    .route('/pubs')
    .get(pubsController.pubsGetAll)
    .post(pubsController.pubsAddOne);
    
router 
    .route('/pubs/:pubID')
    .get(pubsController.pubsGetOne)
    .put(pubsController.pubsUpdateOne)
    .delete(pubsController.pubsDeleteOne);
   
router
    .route('/pubs/:pubID/reviews')
    .get(reviewsController.reviewsGetAll)
    .post(reviewsController.reviewsAddOne);

router
    .route('/pubs/:pubID/reviews/:reviewID')
    .get(reviewsController.reviewsGetOne)
    .put(reviewsController.reviewsUpdateOne)
    .delete(reviewsController.reviewsDeleteOne);


module.exports = router;