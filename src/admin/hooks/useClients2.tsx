import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getClientsAction } from '../actions/get-clients.action';
import type { ClientsResponse } from '@/interfaces/clients.response';


export const useClients = () => {
  const [searchParams] = useSearchParams();

  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery<ClientsResponse[]>({
    queryKey: [
      'clientes',
      { offset, limit },
    ],
    queryFn: () =>
      getClientsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
      }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};