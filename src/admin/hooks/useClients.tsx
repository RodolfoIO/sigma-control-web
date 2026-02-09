import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getClientByIdAction } from '../actions/get-client-by-id.action';
import type { Client } from '@/interfaces/client.interface';
import { createUpdateClientAction } from '../actions/create-update-client.action';

export const useClient = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['client', { id }],
    queryFn: () => getClientByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    // enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: createUpdateClientAction,
    onSuccess: (cliente: Client) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      queryClient.invalidateQueries({
        queryKey: ['client', { id: cliente.id }],
      });

      // Actualizar queryData
      queryClient.setQueryData(['clientes', { id: cliente.id }], cliente);
    },
  });

  return {
    ...query,
    mutation,
  };
};