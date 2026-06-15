const Transaction = require('../models/Transaction');

// @desc Create a transaction
const createTransaction = async (req, res) => {
  try {
    const { category, amount, type, note, date, isRecurring, recurringFrequency } = req.body;
    const transaction = await Transaction.create({
      user: req.user._id,
      category,
      amount,
      type,
      note,
      date,
      isRecurring,
      recurringFrequency,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all transactions for logged-in user (with optional filters)
const getTransactions = async (req, res) => {
  try {
    const { category, type, startDate, endDate } = req.query;
    const filter = { user: req.user._id };

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter)
      .populate('category', 'name color icon type')
      .sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    Object.assign(transaction, req.body);
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTransaction, getTransactions, updateTransaction, deleteTransaction };