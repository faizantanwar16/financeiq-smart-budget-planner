const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  note: { type: String },
  date: { type: Date, required: true, default: Date.now },
  isRecurring: { type: Boolean, default: false },
  recurringFrequency: { type: String, enum: ['none', 'weekly', 'monthly'], default: 'none' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);