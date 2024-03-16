const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const booksController = require('../controllers/booksController');


router.route('/add-book').post(authMiddleware, booksController.addBook);

router.route('/update-book/:id').put(authMiddleware, booksController.updateBook);

router.route('/delete-book/:id').delete(authMiddleware, booksController.deleteBook);

router.route('/get-all-books').get(authMiddleware, booksController.getAllBooks);

router.route('/get-all-books-public').get(booksController.getAllBooksPublic);

router.route('/get-book-by-id/:id').get(authMiddleware, booksController.getOneBook);

router.route('/get-book-by-id/public/:id').get(booksController.getOneBookPublic);


module.exports = router;