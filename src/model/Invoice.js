const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  BookedOn: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  tripType: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  airline: {
    type: Array,
  },
  passenger: {
    type: Array,
  },
  Name: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  Email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  Mobile: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  Card: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  AdtFare: {
    type: Number,
  },
  taxes: {
    type: Number,
  },
  subTotal: {
    type: Number,
  },
  travellerAssist: {
    type: Number,
  },
  flightMonitor: {
    type: Number,
  },
  GrandTotal: {
    type: Number,
  },
  userStatus: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Object,
  },
  updatedBy: {
    type: Object,
  },
});

module.exports = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
