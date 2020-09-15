import { DetallePedido } from './detalle-pedido';

export class Pedido {
    idPedido : number;
    fechapedido : string;
    estadopedido : string = "D";
    total : number = 0;
    idUsuario : number;
    DetallePedido : DetallePedido[] = [];
}
