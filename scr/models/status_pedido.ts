export interface status_pedido{
    id?: number;
    codigo: "pendente" | "pago" | "separação" | "enviado" | "entregue" | "cancelado";
}