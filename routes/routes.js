const { request, response } = require('express')
const express=require('express')
const router = express.Router()
const registertemplatecopy=require('../models/user')
const bcryt=require('bcrypt')
const passport=require("passport")
const cookieparser=require('cookie-parser')
const passportLocal=require("passport-local").Strategy;
const bodyParser=require("body-parser")

require('../passport-config')(passport);

router.post('/register',async (request,response)=>{
    const salt=await bcryt.genSalt(10)
    const securePassword=await bcryt.hash(request.body.password,salt)
    const registeruser=new registertemplatecopy({
        name:request.body.name,
        username:request.body.username,
        password:securePassword
    })
    registeruser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists") ;
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.status(200).send({login:"Successfully Authenticated",publisher:req.user.username});
          

        });
      }
    })(req, res, next);
  });

module.exports=router