const express = require("express");
const router = express.Router();

const {
  getAllCars,
  carById,
  addCar,
  read,
  getPhoto,
  updateCar,
  deleteCar,
} = require("../controllers/car");

const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/cars", getAllCars, (req, res) => {
  res.json({
    cars: req.cars,
  });
});

router.post("/car/add/:userId", requireSignIn, isAuth, isAdmin, addCar);
router.get("/car/:carId", read);
router.delete(
  "/car/delete/:carId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  deleteCar,
  (req, res) => {
    res.json({
      Success: "Successfully deleted car!",
    });
  }
);
router.get("/car/photo/:carId", getPhoto);
router.put(
  "/car/update/:carId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  updateCar
);
router.param("carId", carById);
router.param("userId", userById);
module.exports = router;
