const User = require('../models/usersModel');
const Book = require('../models/booksModel');
const RentRequest = require('../models/requestModel');



// Create new rent request
const createRequestForm = async (req, res) => {
    try {
        const { userId, bookId } = req.body
        const { title, author, libraryId, name, phone } = req.body

        // check if user and book exist
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if(!user || !book){
            return res.status(404).send({
                success: false,
                message: "User or Book not found"
            });
        };

        // Create rent request
        const rentRequest = new RentRequest({
            user: userId,
            book: bookId,
            title: title,
            author: author,
            libraryId: libraryId,
            name: name,
            phone: phone,
        })
        await rentRequest.save();
        res.status(201).send({
            success: true,
            message: "Rent request sent successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    };
};

// Get all rent requests
const getAllRequests = async (req, res) => {
    try {
        const rentRequest = await RentRequest.find().populate('user').populate('book');
        return res.status(201).send({
            success: true,
            message: "Request fetched successfully",
            data: rentRequest,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
};


// Function to approve rent request
const approveRequest = async (req, res) => {
    try {
        const rentRequest = await RentRequest.findById(req.params.id);
        if(!rentRequest){
            return res.status(404).send({
                success: false,
                message: "Rent request not found"
            });
        };
        rentRequest.status = "Approved";
        await rentRequest.save();
        return res.status(201).send({
            success: true,
            message: "Rent request approved successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    };
};







module.exports = {
    createRequestForm,
    getAllRequests,
    approveRequest,
}