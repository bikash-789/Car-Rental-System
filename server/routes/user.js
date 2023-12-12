const express = require("express");
const router = express.Router();

const {
  userById,
  addToOrders,
  getAllOrders,
  getProfilePhoto,
  updateProfile,
} = require("../controllers/user");
const { carById } = require("../controllers/car");
const { requireSignIn, isAuth } = require("../controllers/auth");

router.get("/user/:userId", userById, (req, res) => {
  res.json({
    user: req.user,
  });
});
router.get("/user/photo/:userId", getProfilePhoto);
router.get("/user/:userId/add/order/:carId", addToOrders);
router.get("/user/:userId/get/orders", getAllOrders);
router.put("/user/update/:userId", requireSignIn, isAuth, updateProfile);
router.param("userId", userById);
router.param("carId", carById);
module.exports = router;
