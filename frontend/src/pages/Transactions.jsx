import { useState } from 'react';
import Layout from '../components/Layout';
import { useTransactions, useCreateTransaction, useDeleteTransaction } from '../hooks/useTransactions';
import { useCategories } from '../hooks/useCategories';

const Transactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });

  const { data: transactions = [], isLoading } = useTransactions();
  const { data: categories = [] } = useCategories();
  const createTransaction = useCreateTransaction();
  const deleteTransaction = useDeleteTransaction();

  const filteredCategories = categories.filter((c) => c.type === form.type);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTransaction.mutate(form, {
      onSuccess: () => {
        setShowForm(false);
        setForm({ amount: '', type: 'expense', category: '', note: '', date: new Date().toISOString().split('T')[0] });
      },
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
          <p className="text-sm text-gray-500">Manage your income and expenses</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90"
        >
          {showForm ? 'Cancel' : '+ Add Transaction'}
        </button>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="bg-white rounded-bento p-6 shadow-sm mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">New Transaction</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Type</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value, category: '' })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Amount (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Category</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                {filteredCategories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              {filteredCategories.length === 0 && (
                <p className="text-xs text-orange-500 mt-1">No {form.type} categories yet — add one in Categories first.</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Date</label>
              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Note (optional)</label>
              <input
                type="text"
                placeholder="e.g. Lunch at college"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#accent]"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={createTransaction.isPending}
                className="bg-accent text-white px-6 py-2 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {createTransaction.isPending ? 'Saving...' : 'Save Transaction'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Transactions List */}
      <div className="bg-white rounded-bento shadow-sm overflow-hidden">
        {isLoading ? (
          <p className="text-sm text-gray-400 p-6">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-400 p-6 text-center">No transactions yet. Add your first one above.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Date</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Category</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Note</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Type</th>
                <th className="text-right px-5 py-3 text-xs text-gray-500 font-medium">Amount</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: t.category?.color + '22', color: t.category?.color }}
                    >
                      {t.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{t.note || '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-5 py-3 text-right font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => deleteTransaction.mutate(t._id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Transactions;