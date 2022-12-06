const mongoose =require('mongoose');
//const mongoURI="mongodb://localhost:27017/"
//we have to use this in order access path from  env file
require('dotenv').config()

 async function connectToMonog(){

  const DB=process.env.DATABASE
 await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("database connected");
  })
  .catch(err => {
    console.log("Could not connect", err);
  });


    }




module.exports=connectToMonog