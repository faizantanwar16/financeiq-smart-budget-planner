import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(form, {
      onSuccess: () => navigate('/dashboard'),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5F7] p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
        <div className="bg-navy text-white rounded-bento p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-medium mb-2">FinanceIQ</h1>
          <p className="text-sm text-gray-300">Track expenses, set budgets, and see your financial story unfold.</p>
        </div>

        <div className="bg-white rounded-bento p-8 shadow-sm">
          <h2 className="text-xl font-medium mb-6">Welcome back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            {loginMutation.isError && (
              <p className="text-sm text-red-600">{loginMutation.error.response?.data?.message || 'Login failed'}</p>
            )}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-accent text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account? <Link to="/register" className="text-accent">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;