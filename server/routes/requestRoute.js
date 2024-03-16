const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const requestController = require('../controllers/requestController');


router.route('/rent-request').post(authMiddleware, requestController.createRequestForm);

router.route('/rent-requests').get(authMiddleware, requestController.getAllRequests);

router.route('/rent-request/approve/:id').put(authMiddleware, requestController.approveRequest);


module.exports = router;