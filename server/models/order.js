const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  pickupTime: { type: String }, // ASAP, Scheduled, etc.
  paymentMethod: { type: String }, // Cash, Card, etc.
  additionalNotes: { type: String },

  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      specialInstructions: String
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
