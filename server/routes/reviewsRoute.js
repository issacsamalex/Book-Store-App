const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const reviewsController = require('../controllers/reviewsController');


router.route('/add').post(authMiddleware, reviewsController.addReview);

router.route('/get/:id').get(authMiddleware, reviewsController.getReviewsByBookId);

router.route('/get/user/:id').get(authMiddleware, reviewsController.getReviewsByUserId);

router.route('/update/:id').put(authMiddleware, reviewsController.updateReview);

router.route('/delete/:id').delete(authMiddleware, reviewsController.deleteReview);

router.route('/get/public/:id').get(reviewsController.getReviewsByBookIdPublic);


module.exports = router;