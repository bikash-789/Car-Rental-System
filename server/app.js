const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//import routes from directory
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const carRoutes = require("./routes/car");
const adminRoutes = require("./routes/admin");
//app
const app = express();

//connect to datbase
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(morgan("dev"));
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//route middlewares
app.use(authRoutes);
app.use(userRoutes);
app.use(carRoutes);
app.use(adminRoutes);
//setup a server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port!`);
});
