export interface Pedido {
    id?: number;
    cliente_id: number;
    data_pedido: string;
    pagamento_id: number;
    status_pedido: string; 
    subtotal: number;
    frete: number;
    cupom_id?: number;   
}