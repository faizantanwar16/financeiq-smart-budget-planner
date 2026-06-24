import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

export const useRegister = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/auth/register', data);
      return res.data;
    },
    onSuccess: (data) => {
      login({ _id: data._id, name: data.name, email: data.email }, data.token);
    },
  });
};

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/auth/login', data);
      return res.data;
    },
    onSuccess: (data) => {
      login({ _id: data._id, name: data.name, email: data.email }, data.token);
    },
  });
};