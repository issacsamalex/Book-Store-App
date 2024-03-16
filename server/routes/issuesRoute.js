const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const issueController = require('../controllers/issuesController');




router.route('/issue-new-book').post(authMiddleware, issueController.issueBook);

router.route('/get-issues').post(authMiddleware, issueController.getAllIssues);

router.route('/return-book').post(authMiddleware, issueController.returnBook);

router.route('/edit-issue').post(authMiddleware, issueController.editIssue);

router.route('/delete-issue').post(authMiddleware, issueController.deleteIssue);






module.exports = router;