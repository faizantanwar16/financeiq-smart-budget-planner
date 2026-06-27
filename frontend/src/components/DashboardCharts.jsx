import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

const COLORS = ['accent', '#D85A30', '#2ECC71', '#F39C12', '#9B59B6', '#1ABC9C'];

const DashboardCharts = ({ transactions = [] }) => {
  // Category breakdown for pie chart
  const categoryMap = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const name = t.category?.name || 'Other';
      categoryMap[name] = (categoryMap[name] || 0) + t.amount;
    });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // Monthly income vs expense for bar chart
  const monthlyMap = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    if (!monthlyMap[month]) monthlyMap[month] = { month, income: 0, expense: 0 };
    monthlyMap[month][t.type] += t.amount;
  });
  const barData = Object.values(monthlyMap);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pie Chart */}
      <div className="bg-white rounded-bento p-5 shadow-sm">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Spending by Category</h3>
        {pieData.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No expense data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-bento p-5 shadow-sm">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Income vs Expenses</h3>
        {barData.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No transaction data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="income" fill="#2ECC71" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#D85A30" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DashboardCharts;