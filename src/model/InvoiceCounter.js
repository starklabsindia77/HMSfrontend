const mongoose = require('mongoose');

const invoiceCounterSchema = mongoose.Schema({
  id:{
   type: String,
  },
  seq: {
    type: Number,
  },
  
});

module.exports = mongoose.models.InvoiceCounter || mongoose.model('InvoiceCounter', invoiceCounterSchema);
