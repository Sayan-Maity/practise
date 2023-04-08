const mongoose = require('mongoose');

const geolocationSchema = new mongoose.Schema({
  latitude: {
    type: String,
    default: '0',
  },
  longitude: {
    type: String,
    default: '0',
  },
});

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    default: 'unknown',
  },
  country: {
    type: String,
    default: 'unknown',
  },
  geolocation: {
    type: geolocationSchema,
    required: true,
  },
});

const personSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: 'unknown',
    },
    lastName: {
      type: String,
      required: true,
      default: 'unknown',
    },
    contact: {
      type: String,
      required: true,
    //   match: /^[0-9]{10}$/,
    //   message: 'Please enter a valid 10-digit phone number',
    },
    email: {
      type: String,
      required: true,
    //   match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //   message: 'Please enter a valid email address',
    },
    location: {
      type: locationSchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Person', personSchema);
