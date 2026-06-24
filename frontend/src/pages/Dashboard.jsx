import Layout from '../components/Layout';
import SummaryCards from '../components/SummaryCards';
import DashboardCharts from '../components/DashboardCharts';
import { useTransactions } from '../hooks/useTransactions';

const Dashboard = () => {
  const { data: transactions = [], isLoading } = useTransactions();

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500">Your financial overview</p>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <>
          <SummaryCards transactions={transactions} />
          <DashboardCharts transactions={transactions} />
        </>
      )}
    </Layout>
  );
};

export default Dashboard;