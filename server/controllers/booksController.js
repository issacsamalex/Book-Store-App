const Book = require("../models/booksModel");

// Add a book
const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    return res.send({
        success: true,
        message: "Book added successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, req.body);
        return res.send({
            success: true,
            message: "Book updated successfully"
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        return res.send({
            success: true,
            message: "Book deleted successfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};


// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.send({
            success: true,
            data: books,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};


// Get all books for public routes
const getAllBooksPublic = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.send({
            success: true,
            data: books,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
}

// Get one book by Id
const getOneBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        return res.send({
            success: true,
            data: book,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

// Get one book by Id for Public Routes
const getOneBookPublic = async (req, res) => {
    try {
        const publicBook = await Book.findById(req.params.id);
        return res.send({
            success: true,
            data: publicBook,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};




module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getAllBooksPublic,
    getOneBook,
    getOneBookPublic,
}
