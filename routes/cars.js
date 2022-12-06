const express=require('express')
const router=express.Router();
const Car=require('../models/Car')

// const fetchuser=require('../middleware/fetchuser');


// ROUTE 1:Create a user using :POST "api/cars" .Does't require Auth //no login required


 router.post("/addcar", (req, res) => {
        var myData = new Car(req.body);
        myData.save()
          .then(item => {
            res.send("item saved to database");
            // res.send(req.body)
          })
          .catch(err => {
            res.status(400).send("unable to save to database");
          });
      });
      
      


//ROUTE 3: to fetch all cars


router.get('/getcars', async (req, res) => {
    let cardata=req.carModels;
    console.log(cardata);
    try {
        const cars = await Car.find({ carModels: req.carModels});
        res.json(cars)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

  module.exports=router;