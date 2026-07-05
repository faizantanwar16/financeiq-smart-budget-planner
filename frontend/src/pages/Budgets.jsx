import { useMemo } from 'react';
import Layout from '../components/Layout';
import { useCategories } from '../hooks/useCategories';
import { useTransactions } from '../hooks/useTransactions';

const getProgressColor = (percent) => {
  if (percent >= 100) return { bar: 'bg-red-500', text: 'text-red-500', bg: 'bg-red-50 border-red-200' };
  if (percent >= 80) return { bar: 'bg-orange-400', text: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' };
  return { bar: 'bg-[#378ADD]', text: 'text-[#378ADD]', bg: 'bg-white border-gray-100' };
};

const Budgets = () => {
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const { data: transactions = [], isLoading: txLoading } = useTransactions();

  const budgetCategories = categories.filter((c) => c.type === 'expense' && c.monthlyBudget > 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const spending = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => {
        const d = new Date(t.date);
        return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .forEach((t) => {
        const id = t.category?._id;
        if (id) map[id] = (map[id] || 0) + t.amount;
      });
    return map;
  }, [transactions, currentMonth, currentYear]);

  const isLoading = catLoading || txLoading;

  const totalBudget = budgetCategories.reduce((sum, c) => sum + c.monthlyBudget, 0);
  const totalSpent = budgetCategories.reduce((sum, c) => sum + (spending[c._id] || 0), 0);
  const overallPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
  const overallColors = getProgressColor((totalSpent / totalBudget) * 100);

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Budgets</h2>
        <p className="text-sm text-gray-500">
          Monthly budget tracking —{' '}
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : budgetCategories.length === 0 ? (
        <div className="bg-white rounded-bento p-8 text-center shadow-sm">
          <p className="text-gray-400 text-sm">No budget categories found.</p>
          <p className="text-gray-400 text-xs mt-1">
            Go to Categories and set a monthly budget on your expense categories.
          </p>
        </div>
      ) : (
        <>
          {/* Overall Summary Card */}
          <div className={`border rounded-bento p-5 mb-6 ${overallColors.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Budget</span>
              <span className={`text-sm font-semibold ${overallColors.text}`}>
                ₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className={`${overallColors.bar} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400">{overallPercent.toFixed(1)}% used</span>
              <span className="text-xs text-gray-400">
                ₹{(totalBudget - totalSpent).toLocaleString()} remaining
              </span>
            </div>
          </div>

          {/* Per Category Budget Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetCategories.map((c) => {
              const spent = spending[c._id] || 0;
              const percent = Math.min((spent / c.monthlyBudget) * 100, 100);
              const rawPercent = (spent / c.monthlyBudget) * 100;
              const colors = getProgressColor(rawPercent);
              const remaining = c.monthlyBudget - spent;

              return (
                <div key={c._id} className={`border rounded-bento p-5 shadow-sm ${colors.bg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ backgroundColor: c.color + '22' }}
                      >
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400">
                          Budget: ₹{c.monthlyBudget.toLocaleString()}/mo
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${colors.text}`}>
                        {rawPercent.toFixed(0)}%
                      </p>
                      {rawPercent >= 80 && rawPercent < 100 && (
                        <p className="text-xs text-orange-500">⚠️ Near limit</p>
                      )}
                      {rawPercent >= 100 && (
                        <p className="text-xs text-red-500">🚨 Over budget</p>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                    <div
                      className={`${colors.bar} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">
                      ₹{spent.toLocaleString()} spent
                    </span>
                    <span className={`text-xs font-medium ${remaining < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                      {remaining < 0
                        ? `₹${Math.abs(remaining).toLocaleString()} over`
                        : `₹${remaining.toLocaleString()} left`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Budgets;