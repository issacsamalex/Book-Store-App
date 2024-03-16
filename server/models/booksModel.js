const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  rentPerDay: {
    type: Number,
    required: true,
  },
  rentalPeriod: {
    type: String,
    required: false
  },
  totalCopies: {
    type: Number,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: false,
  },
  isbnNumber: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
},
{
    timestamps: true
});



module.exports = mongoose.model("books", bookSchema);