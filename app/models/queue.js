const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Queue = new mongoose.Schema({
  owner: {
    type: ObjectId,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  access: [
    {
      type: ObjectId,
      index: true
    }
  ],
  enabled: {
    type: Boolean,
    default: false
  },
  accounts: [
    {
      type: ObjectId,
      required: true
    }
  ],
  interval: Number,
  startTime: Number, // 0 is midnight that morning, 86400000 is midnight that night
  endTime: Number // This applies to both start and end times
});

module.exports = mongoose.model('Queue', Queue);
