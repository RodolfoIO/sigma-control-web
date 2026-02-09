import { backendApi } from '@/api/backendApi';
import type { Client } from '@/interfaces/client.interface';

export const createUpdateClientAction = async (
  clientLike: Partial<Client>
): Promise<Client> => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = clientLike;

  const isCreating = id === 'new';

  const { data } = await backendApi<Client>({
    url: isCreating ? '?info=clientes' : `?info=clientes?id=${id}`,
    method: 'POST',
    data: {
      ...rest,
    },
  });

  return {
    ...data,
  };
};

export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}