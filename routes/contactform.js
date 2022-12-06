const express=require('express')
const router=express.Router();
const Contact=require('../models/contact')
const { body, validationResult } = require('express-validator');



// ROUTE 1:Create a user using :POST "api/auth" .Does't require Auth //no login required
router.post('/submit',[
  
  body('fname','Enter a valid fname').isLength({ min: 3 }),
  body('lname','Enter a valid lname').isLength({ min: 3 }),
  body('email','Enter a valid Email').isEmail(),
  body('phone','Phone must be a atleast 11 characters').isLength({ min: 11 }),
  body('city','Enter a valid city').isLength({min:3}),
  body('state','Enter a valid state'),
  body('zip','Enter a valid zip'),
  body('message','Enter a valid messafe')

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
     
  //  let contactform= await Contact.findOne({email:req.body.email})
  //  if(contactform){
  //    return res.status(400).json({success:false,error:"Sorry user with this email already exist"})
  //  }
    

    //method 2:to save user data in database
     contactform= await Contact.create({
      lname: req.body.lname,
      fname: req.body.fname,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      message:req.body.message
    })

  
    success=true;
   //res.json(user);
    res.json({success})

   }
   catch(error){
     success=false;
   console.log(error.message)
   res.status(500).send('Internal server error')
   }
    
  })


  module.exports=router;