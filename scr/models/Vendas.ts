export interface Vendas {
    id?: number;
    clienteid: number;
    nomeproduto: string;
    quantidade: number;
    preco: number;
    total: number;
    metodopagamento: string;
}