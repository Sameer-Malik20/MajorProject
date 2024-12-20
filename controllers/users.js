const User = require("../models/user.js");
const passport = require("passport");



//rendersignup
module.exports.renderSignup = (req,res) => {
    res.render("users/signup.ejs");
}

//signup 
module.exports.signup = async(req,res) => {
    try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
   const registedUser = await User.register(newUser, password);
   console.log(registedUser);
  req.login(registedUser, (err) => {
    if(err){
        return next(err)
    }
    req.flash("success", "Welcome to wanderlust");
    res.redirect("/listings");
   })
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }
}


//renderlogin
module.exports.renderLogin = (req,res) => {
    res.render("users/login.ejs")
}

//login
module.exports.login =  async (req,res) => {
    req.flash("success","Welcome to Wanderlust Yor are logged in")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

//logout
module.exports.logout =  (req,res,next) => {
    req.logOut((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings")
    })
}