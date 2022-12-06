const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs')
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');
// const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET="Harryisagoodb$oy"

// ROUTE 1:Create a user using :POST "api/auth" .Does't require Auth //no login required
router.post('/createuser',[
  
  body('name','Enter a valid name').isLength({ min: 5 }),
  body('email','Enter a valid Email').isEmail(),
  body('Password','Password must be a atleast 5 characters').isLength({ min: 5 })

],
async (req, res) => {
     // Finds the validation errors in this request and wraps them in an object with handy functions
     let success=true;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({success:false, errors: errors.array() });
       
     }
    console.log(req.body)
    //method 1: to save data in database
    //const user=User(req.body);
    //user.save()
   // res.send(req.body)

   //Check whether the user with this Eamil exist Already
   try{
     
   let user= await User.findOne({email:req.body.email})
   if(user){
     return res.status(400).json({success:false,error:"Sorry user with this email already exist"})
   }
    
    //using bcrytjs to encrypt passwrod
    const salt = await bcrypt.genSalt(10);
    secPass= await bcrypt.hash(req.body.Password,salt)
    //method 2:to save user data in database
     user= await User.create({
      name: req.body.name,
      email: req.body.email,
      Password: secPass,
    })

    //integrating jwt token
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
 
  
    success=true;
   //res.json(user);
    res.json({success,authtoken})

   }
   catch(error){
     success=false;
   console.log(error.message)
   res.status(500).send('Internal server error')
   }
    
  })
  
  // ROUTE 2:Authenticate a user using: POST "/api/auth/login",NO login required
  router.post('/login',[

    body('email','Enter a valid Email').isEmail(),
    body('Password','Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success=true;
            // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({success:false, errors: errors.array() });
     }


     const {email,Password}=req.body;
     try {
       let user= await User.findOne({email});
       if(!user){
         return res.status(400).json({success:false,error:"Please try to login with correct Credentials"})
       }
        
       const passwordCompare= await bcrypt.compare(Password,user.Password)
       if(!passwordCompare){
        return res.status(400).json({error:"Please try to login with correct Credentials"})
       }

    //integrating jwt token
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    let success=true;
    res.json({success,authtoken})
  
     } catch (error) {
      success=false;
      console.log(error.message)
      res.status(500).send('Some Error occured')
     }
  })



  module.exports=router;