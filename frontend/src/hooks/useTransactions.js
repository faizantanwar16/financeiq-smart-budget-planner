import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export const useTransactions = (filters = {}) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await api.get(`/transactions?${params}`);
      return res.data;
    },
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/transactions', data),
    onSuccess: () => queryClient.invalidateQueries(['transactions']),
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/transactions/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['transactions']),
  });
};