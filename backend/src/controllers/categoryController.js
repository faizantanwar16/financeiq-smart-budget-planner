const Category = require('../models/Category');

// @desc Create a category
const createCategory = async (req, res) => {
  try {
    const { name, type, icon, color, monthlyBudget } = req.body;
    const category = await Category.create({
      user: req.user._id,
      name,
      type,
      icon,
      color,
      monthlyBudget,
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all categories for logged-in user
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update a category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.user._id });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    Object.assign(category, req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete a category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };