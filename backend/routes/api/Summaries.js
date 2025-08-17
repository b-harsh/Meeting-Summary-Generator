const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Summary = require('../../models/Summary');

router.get('/', async (req, res) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { originalTranscript, summaryText } = req.body;
    const newSummary = new Summary({ originalTranscript, summaryText });
    const summary = await newSummary.save();
    res.json(summary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
