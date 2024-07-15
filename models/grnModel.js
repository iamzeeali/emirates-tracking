const mongoose = require("mongoose");

const grnSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  poNumber: {
    type: String,
  },
  vendorCode: {
    type: String,
  },
  vendorName: {
    type: String,
  },
  transactionType: {
    type: String,
  },
  modeOfDelivery: {
    type: String,
  },
  inDate: {
    type: Date,
  },
  giNumber: { type: String },
  transDate: {
    type: Date,
  },
  manual: Boolean,

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

grnSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });

  next();
});

grnSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = GRN = mongoose.model("GRN", grnSchema);
