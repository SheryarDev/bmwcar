const connectToMonog = require("./db")
const express = require('express')
const bodyParser = require("body-parser");
const path=require("path")
 const cors=require('cors');

connectToMonog();
const app = express()
const port = process.env.PORT || 5000

//we use app.use(cors()) to reslove this error
// Login:1 Access to fetch at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.


//app.use(cors({ origin: '*', credentials: true,Methods: POST, GET}));
//to check server start on heroku


//in order to use req.body we have to use this middleware
app.use(express.json(express.static(path.join(__dirname,"./client/build"))))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use('/api/auth',require('./routes/Auth'))
 app.use('/api/cars',require('./routes/cars'))
 app.use('/api/contactform',require('./routes/contactform'))

//static files
  
Available Routes
app.get("*",function(req,res){  
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

app.listen(port, () => {
  console.log(`car backend listening on port ${port}`)
})
