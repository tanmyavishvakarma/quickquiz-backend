const express =require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const routes=require('./routes/routes')
const cors=require('cors')
const passport=require("passport")
const passportlocal = require("passport-local").Strategy;
const bodyParser=require("body-parser")
const session=require("express-session") 
const cookieparser=require('cookie-parser')

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>
console.log("database connected")
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(cookieparser("secret"))
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);
app.use(express.json())
app.use('/api',routes)


const port_number = process.env.PORT || 5000;
app.listen(port_number);

module.exports = app;