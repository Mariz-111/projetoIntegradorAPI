export interface compras{
    id?: number;
    usuario_id: string;
    produto_id: string;
    metodo_pagamento: string;
    status_pagamento: string;
    data_pagamento: number;
    endereco_entrega: string;
    status_entrega: string;
    frete: string;
    cupom_id: string;
    quantidade: number;
    valor_total: number;
}