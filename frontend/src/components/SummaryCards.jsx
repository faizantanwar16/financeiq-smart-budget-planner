const cards = [
  { label: 'Total Income', key: 'income', color: 'bg-green-50 border-green-200', text: 'text-green-600', icon: '💰' },
  { label: 'Total Expenses', key: 'expense', color: 'bg-red-50 border-red-200', text: 'text-red-500', icon: '💸' },
  { label: 'Net Savings', key: 'savings', color: 'bg-blue-50 border-blue-200', text: 'text-blue-600', icon: '🏦' },
];

const SummaryCards = ({ transactions = [] }) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = income - expense;

  const values = { income, expense, savings };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`${card.color} border rounded-bento p-5 flex items-center gap-4`}
        >
          <span className="text-3xl">{card.icon}</span>
          <div>
            <p className="text-xs text-gray-500 font-medium">{card.label}</p>
            <p className={`text-xl font-semibold ${card.text}`}>
              ₹{values[card.key].toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;