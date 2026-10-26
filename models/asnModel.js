const mongoose = require("mongoose");

const asnSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  poNumber: {
    type: String,
  },
  docDate: {
    type: Date,
  },
  asnUploadDate: {
    type: Date,
  },
  vendorCode: {
    type: String,
  },
  vendorName: {
    type: String,
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

asnSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });

  next();
});

asnSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = ASN = mongoose.model("ASN", asnSchema);
