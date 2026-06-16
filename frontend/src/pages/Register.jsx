import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(form, {
      onSuccess: () => navigate('/dashboard'),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5F7] p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
        <div className="bg-navy text-white rounded-bento p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-medium mb-2">FinanceIQ</h1>
          <p className="text-sm text-gray-300">Create an account to start tracking your budget.</p>
        </div>

        <div className="bg-white rounded-bento p-8 shadow-sm">
          <h2 className="text-xl font-medium mb-6">Create account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
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
            {registerMutation.isError && (
              <p className="text-sm text-red-600">{registerMutation.error.response?.data?.message || 'Registration failed'}</p>
            )}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-accent text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {registerMutation.isPending ? 'Creating account...' : 'Register'}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-accent">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;