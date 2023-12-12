const User = require("../models/user");
const jwtt = require("jsonwebtoken");
const { expressjwt: jwt } = require("express-jwt");

//signup
exports.signUp = (req, res) => {
  //console.log(req.body);
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(200).json({
      user,
    });
  });
};

//signin
exports.signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .json({
          error: "User with this email doesn't exist, please SignUp",
        })
        .status(400);
    }

    //if user is found, make sure the email and password match

    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password doesn't match!",
      });
    }

    //generate a signed token with user id and secret
    const token = jwtt.sign({ _id: user._id }, "coding");

    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date().getMinutes() + 1 });

    //return response with user and token to frontend client
    const { _id, name, email, role, phone, address } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        name,
        phone,
        address,
        role,
      },
    });
  });
};

//signout
exports.signOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signed out successfully!" });
};

exports.requireSignIn = jwt({
  secret: "coding",
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.user && req.auth && req.user._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied!",
    });
  }
  next();
};

//function to check if the user is normal user or admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role == 0) {
    return res.status(403).json({
      error: "User is not admin!",
    });
  }
  next();
};
