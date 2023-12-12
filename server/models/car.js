const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carMake: {
    type: String,
    maxlength: 20,
    required: true,
  },
  carModel: {
    type: String,
    maxlength: 32,
    required: true,
  },
  carColor: {
    type: String,
    maxlength: 20,
    required: true,
  },
  carPrice: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  carId: {
    type: String,
    required: true,
  },
  carCapacity: {
    type: String,
    required: true,
  },
  carPhoto: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Car", carSchema);
