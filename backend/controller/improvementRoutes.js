const Improvement = require('../models/improvement');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json("Improvement API is working good");
});

router.get('/improvements', async (req, res) => {
    try {
      const improvements = await Improvement.find().populate('user', 'name email'); 
      res.status(200).json(improvements);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });






  
  
  
  
  router.get('/improvements/:id', async (req, res) => {
    try {
      const improvement = await Improvement.findById(req.params.id).populate('user', 'name email');
      if (!improvement) {
        return res.status(404).json({ error: 'Improvement not found' });
      }
      res.status(200).json(improvement);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  
  
  
  
  

  router.post('/create', async (req, res) => {
      try {
          const { title, description, impact, estimated_time, estimated_budget, phone, user } = req.body;
  
          // Check if the user exists
          const existingUser = await User.findById(user); 
          if (!existingUser) {
              return res.status(400).json({ error: "User does not exist. Try logging in and try again." });
          }
  
       
          const newImprovement = new Improvement({
              title,
              description,
              impact,
              estimated_time,
              estimated_budget,
              phone,
              user
          });
  
          // Save the new improvement
          await newImprovement.save();
  
          res.status(201).json({ message: "New improvement proposal created." });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error." });
      }
  });
  
  module.exports = router;
