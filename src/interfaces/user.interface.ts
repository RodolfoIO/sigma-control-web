export interface User {
  id: string;
  usuario_creador: User;
  fecha_creacion: Date;
  usuario_actualizador: User;
  fecha_actualizacion: Date;
  es_activo: boolean;
  nombres: string;
  apellidos: string;
  avatar: string;
  correo: string;
  usuario: string;
  password: string;
}
