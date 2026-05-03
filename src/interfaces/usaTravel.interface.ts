import type { Client } from "./client.interface";
import type { User } from "./user.interface";

export interface UsaTravel {
  id: string;
  usuario_creador: User;
  fecha_creacion: Date;
  usuario_actualizador: User;
  fecha_actualizacion: Date;
  es_activo: boolean;
  id_cliente: Client;
  fechaViaje: string;
  cantidad: number;
  temporalidad: string;
}
