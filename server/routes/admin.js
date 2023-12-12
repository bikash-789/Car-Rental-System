const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUsersCount,
  getOrdersCount,
  getOrders,
} = require("../controllers/admin");
router.get("/users", getAllUsers, (req, res) => {
  res.json({
    users: req.users,
  });
});
router.get("/users/count", getUsersCount, (req, res) => {
  res.json({
    userCount: req.userCount,
  });
});

router.get("/orders/count", getOrdersCount);
router.get("/orders", getOrders);
module.exports = router;
