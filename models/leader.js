const mongoose = require('mongoose')

const leader = new mongoose.Schema({
    publisher:{
        type:String,
        required:true
    },
    points:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('leadertable',leader)