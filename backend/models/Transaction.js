const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Healthcare', 'Education', 'Other', 'Income']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
