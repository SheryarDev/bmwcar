const connectToMonog = require("./db")
const express = require('express')
const mongoose =require('mongoose');
const bodyParser = require("body-parser");
const path=require("path")
connectToMonog();
const app = express()
const port = process.env.PORT || 5000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use('/api/auth',require('./routes/Auth'))
 app.use('/api/cars',require('./routes/cars'))
 app.use('/api/contactform',require('./routes/contactform'))

  
//static files

app.use(express.static(path.join(__dirname,"../client/build")));
const mypath=path.join(__dirname,"./client/build/index.html")
console.log(mypath)
  
// Available Routes
app.get("*",(req,res)=>{  
  res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
    res.status(500).send(err);
  })
})

app.listen(port, () => {
  console.log(`car backend listening on port ${port}`)
})