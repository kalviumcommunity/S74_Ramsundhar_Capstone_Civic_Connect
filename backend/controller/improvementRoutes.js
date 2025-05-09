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








module.exports = router;
