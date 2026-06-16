import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('financeiq_user')) || null,
  token: localStorage.getItem('financeiq_token') || null,

  login: (userData, token) => {
    localStorage.setItem('financeiq_user', JSON.stringify(userData));
    localStorage.setItem('financeiq_token', token);
    set({ user: userData, token });
  },

  logout: () => {
    localStorage.removeItem('financeiq_user');
    localStorage.removeItem('financeiq_token');
    set({ user: null, token: null });
  },
}));

export default useAuthStore;