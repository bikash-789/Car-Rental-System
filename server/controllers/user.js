const formidable = require("formidable");
const User = require("../models/user");
const _ = require("lodash");
const fs = require("fs");
// Get a user by id
exports.userById = (req, res, next, id) => {
  User.findById({ _id: id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found!",
      });
    }
    req.user = user;
    next();
  });
};

// Add a car to orders
exports.addToOrders = (req, res) => {
  User.findById(req.user._id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User is not registered, Please signup!",
      });
    }
    user.orders.push(req.car._id);
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({ orders: result.orders });
    });
  });
};

// Get all the orders of the user
exports.getAllOrders = (req, res) => {
  User.findById(req.user._id)
    .populate("orders")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User is not registered, Please signup!",
        });
      }
      return res.status(200).json({
        orders: user.orders,
      });
    });
};

// GET profile photo of user
exports.getProfilePhoto = (req, res, next) => {
  if (req.user.profilePhoto.data) {
    res.set("Content-Type", req.user.profilePhoto.contentType);
    return res.send(req.user.profilePhoto.data);
  }
  next();
};

// Edit user profile details
exports.updateProfile = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!",
      });
    }
    let { name, phone, address } = fields;
    if (!name || !phone || !address) {
      return res.status(400).json({
        error: "All fields are required!",
      });
    }
    let user = req.user;
    user = _.extend(user, fields);

    if (files.profilePhoto) {
      if (files.profilePhoto.size > 3000000) {
        return res.status(400).json({
          error: "Image size should be less than 3MB",
        });
      }
      user.profilePhoto.data = fs.readFileSync(files.profilePhoto.filepath);
      user.profilePhoto.contentType = files.profilePhoto.type;
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json(result);
    });
  });
};
