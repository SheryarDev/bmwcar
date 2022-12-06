const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: false
    },
    phone:{
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true,
        unique:false
      
    },
    state:{
        type: String,
        required: true,
        unique:false
     
    },
    zip:{
        type: String,
        required: true,
        unique:false
       
    }, 
    message:{
        type: String,
        required: true,
        unique:false

        
    },
    // date:{
    //     type: Date,
    //     default: Date.now
    // },
  });
  const Contact = mongoose.model('contact', ContactSchema);
  //User.createIndexes(); //it will create index of email to identify each record uniquely
  module.exports = Contact;