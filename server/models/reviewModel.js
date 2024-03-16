const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reviews", reviewSchema);
