import type { Client } from "./client.interface"
import type { User } from "./user.interface"

export interface Visa {
    id: string
    usuario_creador: User
    fecha_creacion: Date
    usuario_actualizador: User
    fecha_actualizacion: Date
    es_activo: boolean
    id_cliente: Client
    fecha: Date
    numero: string
    tipo: string
    extraviada: string
    cancelada: string
}