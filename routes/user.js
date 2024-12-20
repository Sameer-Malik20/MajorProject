const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const asyncWrap = require("../utils/wrapAsync.js");
const { tr } = require("@faker-js/faker");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


//combine two route 
router.route("/signup")
.get(userController.renderSignup)
.post(asyncWrap(userController.signup));


//combine two route 
router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,passport.authenticate("local",
{failureRedirect: "/login", failureFlash:true}),
userController.login)


//logout route
router.get("/logout",userController.logout)

module.exports = router;