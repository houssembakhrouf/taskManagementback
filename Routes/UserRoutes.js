const express = require("express");
const router = express.Router();
const { Register, Login , Userdata } = require("../Controllers/UserControolers");
const { check } = require("express-validator");
const userMiddleware = require('../Middleware/UserMiddleware')

router.post(
  "/register",
  [
    check("email", "not a valid email").isEmail().normalizeEmail(),
    check("password", "your password should containt .. ").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }),
  ],
  Register
);
router.post("/login", Login);
router.get("/getdata",userMiddleware,Userdata);

module.exports = router;
