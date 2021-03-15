const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema({

    uuid:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    vin :{
        type:String,
        lowercase: true,
        trim:true
    },
    make :{
        type:String,
        lowercase: true,
        trim:true
    },
    model :{
        type:String,
        lowercase: true,
        trim:true
    },
    mileage :{
        type:String,
        lowercase: true,
        trim:true
    },
    year :{
        type:Number,
        lowercase: true,
        trim:true
    },
    price :{
        type:Number,
        lowercase: true,
        trim:true
    },
    zipcode :{
        type:Number,
        lowercase: true,
        trim:true
    },
    createDate :{
        type:Date,
    },
    updateDate :{
        type:Date,
    } 

});

module.exports = mongoose.model('Files',filesSchema);