const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  icon: { type: String, default: 'wallet' },
  color: { type: String, default: '#378ADD' },
  monthlyBudget: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);