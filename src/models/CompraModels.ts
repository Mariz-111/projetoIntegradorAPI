export interface Compra {
    id?: number;
    cliente_id: number;
    produto_id: number;
    metodo_pagamento: string; 
    status_pagamento: string;  
    data_pagamento: string | null;
    status_entrega: string;    
    frete: number;
    cupom_id?: number;         
    quantidade: number;
    subtotal: number;         
    valor_total: number;       
}