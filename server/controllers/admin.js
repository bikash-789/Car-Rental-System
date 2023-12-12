const User = require("../models/user");

// Get all the registered users
exports.getAllUsers = (req, res, next) => {
  User.find({}, { profilePhoto: 0 }).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No users",
      });
    }

    const customers = users.filter((user) => {
      return user.role == 0;
    });
    req.users = customers;
    next();
  });
};

// Get count of registered users
exports.getUsersCount = (req, res, next) => {
  User.find({}, { profilePhoto: 0 }).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No users",
      });
    }
    const customers = users.filter((user) => {
      return user.role == 0;
    });
    req.userCount = customers.length;
    next();
  });
};

// Get count of all the orders
exports.getOrdersCount = (req, res) => {
  User.find({}, { profilePhoto: 0 }).exec((err, users) => {
    if (err || !users) {
      return res.json(400).json({
        error: "No any registered users!",
      });
    }
    let ordersCount = 0;
    for (var i = 0; i < users.length; i++) {
      if (users[i].orders != undefined) {
        ordersCount += users[i].orders.length;
      }
    }
    return res.status(200).json({
      totalOrders: ordersCount,
    });
  });
};

// Get all the orders made from all the users
exports.getOrders = (req, res) => {
  User.find({}, { profilePhoto: 0 })
    .populate("orders")
    .exec((err, users) => {
      if (err || !users) {
        return res.json(400).json({
          error: "No any registered users!",
        });
      }
      let orders = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].orders.length != 0 && users[i].role == 0) {
          let order = {
            orderedBy: users[i]._id,
            orders: users[i].orders,
          };
          orders.push(order);
        }
      }
      return res.status(200).json({
        allOrders: orders,
      });
    });
};
