import { InsumoCart } from './insumoCart';

export interface Cart {
    nombreEncargado: string;
    telefonoEncargado: string;
    emailEncargado: string;
    descripcion: string;
    estado: string;
    insumos: Array<InsumoCart>;
    idProveedor: string;
}
