const mongoose = require('mongoose');
const { stringify } = require('querystring');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

//creating schema for Notes
const CarSchema = new Schema({
    id:{
     type:mongoose.Schema.Types.ObjectId,
    //  ref:'user',
    },
    img:{
      type:String,
      required:true
    },
    name:{
        type:String,
        required:true
  
    }
  //   color: {
  //       type: String,
  //       required:true // String is shorthand for {type: String}
  // } ,

  //   model:{
  //      type:Number,
  //      required:true
  //   }

        
    // tag: {
    //    type:String,
    //    default:"General"
    // },
    // description:   {
    //    type: String,
    //     required:true,
    // },
  
    // date:{
    //     type:Date,
    //     default:Date.now
    // }
  
  });
  

  const Car=mongoose.model('carModels',CarSchema)
  module.exports = Car;

