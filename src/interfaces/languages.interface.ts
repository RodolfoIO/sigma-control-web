import type { User } from "./user.interface";

export interface Language {
  id: string;
  usuario_creador: User;
  fecha_creacion: Date;
  usuario_actualizador: User;
  fecha_actualizacion: Date;
  es_activo: boolean;
  idioma: string;
  texto_plano: string;
}
