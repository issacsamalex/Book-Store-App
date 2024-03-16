const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    libraryId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("requests", requestSchema);
