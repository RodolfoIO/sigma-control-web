import type { ClientsResponse } from '@/interfaces/clients.response';

export const getClientsAction = async (): Promise<ClientsResponse[]> => {
  try {
    const url = new URL(import.meta.env.VITE_API_URL);

    url.searchParams.set('action', 'list');
    url.searchParams.set('info', 'clientes');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};