import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/transactions', label: 'Transactions', icon: '💸' },
  { to: '/categories', label: 'Categories', icon: '🗂️' },
  { to: '/budgets', label: 'Budgets', icon: '🎯' },
];

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-56 min-h-screen bg-navy text-white flex flex-col px-4 py-6 gap-2">
      <div className="mb-6 px-2">
        <h1 className="text-lg font-semibold tracking-tight">FinanceIQ</h1>
        <p className="text-xs text-gray-400 mt-1">{user?.name}</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-navy text-white font-medium'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all"
      >
        <span>🚪</span> Logout
      </button>
    </aside>
  );
};

export default Sidebar;