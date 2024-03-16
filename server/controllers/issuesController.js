const Issue = require("../models/issuesModel");
const Book = require("../models/booksModel");

// Issue a book to user
const issueBook = async (req, res) => {
  try {
    // Inventory management(available copies of book must be decremented by 1)
    await Book.findByIdAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: -1 } }
    );

    // Issue book to user(create new issue record)
    const newIssue = new Issue(req.body);
    await newIssue.save();
    return res.send({
      success: true,
      message: "Book issued successfully",
      data: newIssue,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// Get issues
const getAllIssues = async (req, res) => {
  try {
    delete req.body.userIdFromToken;
    const issues = await Issue.find(req.body).populate("book").populate("user").sort({ issueDate: -1 });
    return res.send({
      success: true,
      message: "Issues fetched successfully",
      data: issues,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    // Inventory management(available copies of book must be incremented by 1)
    await Book.findByIdAndUpdate(
      {
        _id: req.body.book,
      },
      {
        $inc: { availableCopies: 1 },
      }
    );

    // Return book(update issue record)
    await Issue.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );

    return res.send({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};


// Edit an issue
const editIssue = async (req, res) => {
  try {
    await Issue.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );
    res.send({
      success: true,
      message: "Issue updated successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// Delete an issue
const deleteIssue = async (req, res) => {
    try {
        // Inventory management(available copies of book must be incremented by 1)
        await Book.findOneAndUpdate(
            { _id : req.body.book },
            { $inc : {availableCopies: 1}}
        );

        // delete issue from DB
        await Issue.findOneAndDelete(
            { _id : req.body._id}
        );
        res.send({
            success: true,
            message: "Issue Deleted successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};




module.exports = {
  issueBook,
  getAllIssues,
  returnBook,
  editIssue,
  deleteIssue
};
