const Asn = require("../models/asnModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllAsns = factory.getAll(Asn);
exports.createAsn = exports.createGrn = catchAsync(async (req, res, next) => {
  const newAsn = new Asn({
    poNumber: req.body.poNumber,
    asnUploadDate: req.body.asnUploadDate,
    vendorCode: req.body.vendorCode,
    vendorName: req.body.vendorName,
    manual: req.body.manual,
    user: req.user.id,
  });

  const doc = await newAsn.save();

  res.status(201).json({
    status: "success",
    data: doc,
  });
});
exports.getLimitedAsns = catchAsync(async (req, res, next) => {
  const numberOfDaysToLookBack = 7;

  const features = await new APIFeatures(
    Asn.find({
      date: {
        $gte: new Date(
          new Date().getTime() - numberOfDaysToLookBack * 24 * 60 * 60 * 1000
        ),
      },
    }),
    req.query
  ).sort({
    date: -1,
  });

  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: {
      data: docs,
    },
  });
});

exports.getAsn = factory.getOne(Asn);
exports.updateAsn = factory.updateOne(Asn);
exports.deleteAsn = factory.deleteOne(Asn);
