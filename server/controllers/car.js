const Car = require("../models/car");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const errorHandler = require("../helpers/dbErrorHandler");

//get all the cars [GET]
exports.getAllCars = (req, res, next) => {
  Car.find().exec((err, cars) => {
    if (err || !cars) {
      res.json({
        error: "No available cars!",
      });
    }
    req.cars = cars;
    next();
  });
};

//get car by id [GET]
exports.carById = (req, res, next, id) => {
  Car.findById(id).exec((err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Car not found!",
      });
    }
    req.car = result;
    next();
  });
};

//post a new car [POST]
exports.addCar = (req, res) => {
  //check for incoming form
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!",
      });
    }
    let { carMake, carModel, carColor, carPrice, carType, carId, carCapacity } =
      fields;

    if (
      !carMake ||
      !carModel ||
      !carColor ||
      !carPrice ||
      !carType ||
      !carId ||
      !carCapacity
    ) {
      return res.status(400).json({
        error: "All fields are required!",
      });
    }
    let car = new Car(fields);
    if (files.carPhoto) {
      if (files.carPhoto.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB",
        });
      }
      car.carPhoto.data = fs.readFileSync(files.carPhoto.filepath);
      car.carPhoto.contentType = files.carPhoto.type;
    }
    car.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.status(200).json(result);
    });
  });
};

//Update api [PUT]
exports.updateCar = (req, res) => {
  //check for incoming form
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!",
      });
    }
    let { carMake, carModel, carColor, carPrice, carType, carId, carCapacity } =
      fields;

    if (
      !carMake ||
      !carModel ||
      !carColor ||
      !carPrice ||
      !carType ||
      !carId ||
      !carCapacity
    ) {
      return res.status(400).json({
        error: "All fields are required!",
      });
    }
    let car = req.car;
    car = _.extend(car, fields);

    if (files.carPhoto) {
      if (files.carPhoto.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB",
        });
      }
      car.carPhoto.data = fs.readFileSync(files.carPhoto.filepath);
      car.carPhoto.contentType = files.carPhoto.type;
    }
    car.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.status(200).json(result);
    });
  });
};

//get a car
exports.read = (req, res) => {
  req.car.carPhoto = undefined;
  return res.json(req.car).status(200);
};

//api to get photo of a car
exports.getPhoto = (req, res, next) => {
  if (req.car.carPhoto.data) {
    res.set("Content-Type", req.car.carPhoto.contentType);
    return res.send(req.car.carPhoto.data);
  }
  next();
};

//api to delete car
exports.deleteCar = (req, res, next) => {
  if (req.car) {
    Car.findByIdAndDelete(req.car._id).exec((err, result) => {
      if (err) {
        res
          .json({
            error: "Could not delete!",
          })
          .status(400);
      }
      next();
    });
  }
};
