import { useState } from 'react';
import Layout from '../components/Layout';
import { useCategories, useCreateCategory } from '../hooks/useCategories';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const COLORS = ['#accent', '#D85A30', '#2ECC71', '#F39C12', '#9B59B6', '#1ABC9C', '#E74C3C', '#3498DB'];
const ICONS = ['🍔', '🚗', '🏠', '💼', '🎮', '📚', '💊', '✈️', '🛍️', '💡', '🎵', '🏋️'];

const Categories = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'expense', color: '#accent', icon: '🍔', monthlyBudget: '' });

  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const queryClient = useQueryClient();

  const deleteCategory = useMutation({
    mutationFn: (id) => api.delete(`/categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['categories']),
  });

  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory.mutate(form, {
      onSuccess: () => {
        setShowForm(false);
        setForm({ name: '', type: 'expense', color: '#accent', icon: '🍔', monthlyBudget: '' });
      },
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
          <p className="text-sm text-gray-500">Manage your income and expense categories</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90"
        >
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="bg-white rounded-bento p-6 shadow-sm mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">New Category</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Name</label>
              <input
                type="text"
                placeholder="e.g. Groceries"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Type</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Monthly Budget (₹)</label>
              <input
                type="number"
                placeholder="0 for income categories"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.monthlyBudget}
                onChange={(e) => setForm({ ...form, monthlyBudget: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm({ ...form, icon })}
                    className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border transition-all ${
                      form.icon === icon ? 'border-accent bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Color</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForm({ ...form, color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      form.color === color ? 'border-gray-800 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={createCategory.isPending}
                className="bg-accent text-white px-6 py-2 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {createCategory.isPending ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Expense</h3>
            <div className="flex flex-col gap-3">
              {expenseCategories.length === 0 ? (
                <p className="text-sm text-gray-400 bg-white rounded-bento p-4">No expense categories yet.</p>
              ) : (
                expenseCategories.map((c) => (
                  <div key={c._id} className="bg-white rounded-bento p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: c.color + '22' }}>
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{c.name}</p>
                        {c.monthlyBudget > 0 && (
                          <p className="text-xs text-gray-400">Budget: ₹{c.monthlyBudget.toLocaleString()}/mo</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCategory.mutate(c._id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-xl"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Income Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Income</h3>
            <div className="flex flex-col gap-3">
              {incomeCategories.length === 0 ? (
                <p className="text-sm text-gray-400 bg-white rounded-bento p-4">No income categories yet.</p>
              ) : (
                incomeCategories.map((c) => (
                  <div key={c._id} className="bg-white rounded-bento p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: c.color + '22' }}>
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400">Income</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCategory.mutate(c._id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-xl"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Categories;