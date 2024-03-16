const Review = require('../models/reviewModel');
const Book = require('../models/booksModel');
const mongoose = require("mongoose");


// Add review
const addReview = async (req, res) => {
    try {
        // Saving new review to DB
        // req.body.user = req.userId;
        const newReview = new Review(req.body);
        await newReview.save();

        // Calculate average rating and update in Book DB
        const bookId = new mongoose.Types.ObjectId(req.body.book)
        const averageRating = await Review.aggregate([
            {
                $match: { book: bookId }
            },
            {
                $group: {
                    _id: "$book",
                    averageRating: {$avg: "$rating"}
                }
            }
        ]);
        const averageRatingValue = averageRating[0]?.averageRating || 0;

        await Book.findOneAndUpdate( bookId, { rating: averageRatingValue});

        return res.send({
            success: true,
            message: "Review added successfully"
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
          });
    }
};


// Get all review by book id
const getReviewsByBookId = async (req, res) => {
    try {
        const bookId = new mongoose.Types.ObjectId(req.params.id)
        const reviews = await Review.find({book: bookId}).sort({ createdAt: -1 }).populate("user").populate("book");
        return res.send({
            success: true,
            message: "Review found successfully",
            data: reviews,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
          });
    }
};

//Get all review by user Id
const getReviewsByUserId = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id)
        const reviews = await Review.find({user: userId}).sort({ createdAt: -1 }).populate("user").populate("book");
        return res.send({
            success: true,
            message: "Review found successfully",
            data: reviews,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
          });
    }
};

// Update Review
const updateReview = async (req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

         // Calculate average rating and update in Book DB
        const bookId = new mongoose.Types.ObjectId(req.body.book)
        const averageRating = await Review.aggregate([
            {
                $match: { book: bookId }
            },
            {
                $group: {
                    _id: "$book",
                    averageRating: {$avg: "$rating"}
                }
            }
        ]);
        const averageRatingValue = averageRating[0]?.averageRating || 0;

        await Book.findOneAndUpdate( bookId, { rating: averageRatingValue});

        return res.send({
            success: true,
            message: "Review updated successfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
          });
    }
};

// Delete Review
const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);

         // Calculate average rating and update in Book DB
         const bookId = req.body.book
         const averageRating = await Review.aggregate([
             {
                 $match: { book: bookId }
             },
             {
                 $group: {
                     _id: "$book",
                     averageRating: {$avg: "$rating"}
                 }
             }
         ]);
         const averageRatingValue = averageRating[0]?.averageRating || 0;
 
         await Book.findOneAndUpdate( bookId, { rating: averageRatingValue});
 
         return res.send({
             success: true,
             message: "Review deleted successfully",
         });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};






// Get all review by book id for Public route
const getReviewsByBookIdPublic = async (req, res) => {
    try {
        const bookId = new mongoose.Types.ObjectId(req.params.id)
        const reviews = await Review.find({book: bookId}).populate("user").populate("book");
        return res.send({
            success: true,
            message: "Review found successfully",
            data: reviews,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
          });
    }
};







module.exports = {
    addReview,
    getReviewsByBookId,
    getReviewsByUserId,
    updateReview,
    deleteReview,
    getReviewsByBookIdPublic,
}