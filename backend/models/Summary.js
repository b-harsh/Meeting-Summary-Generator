const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  originalTranscript: {
    type: String,
    required: [true, 'Please add the original transcript'],
  },
  summaryText: {
    type: String,
    required: [true, 'Please add the Summary Text'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Summary', SummarySchema);
