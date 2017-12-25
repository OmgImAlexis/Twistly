const mongoose = require('mongoose');

const TumblrAccount = new mongoose.Schema({
  token: {
    required: true,
    type: String,
    select: false
  },
  secret: {
    required: true,
    type: String,
    select: false
  },
  blogs: [],
  enabled: {
    required: true,
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('TumblrAccount', TumblrAccount);
