import db from "../database/database";
import { Compra } from "../models/CompraModels";

export class CompraRepository {

    salvar(compra: Compra): Compra {
        const resultado = db
            .prepare(`
                INSERT INTO compra (
                    cliente_id, 
                    produto_id, 
                    metodo_pagamento, 
                    status_pagamento, 
                    data_pagamento, 
                    status_entrega, 
                    frete, 
                    cupom_id, 
                    quantidade, 
                    subtotal,
                    valor_total
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `)
            .run(
                compra.cliente_id,
                compra.produto_id,
                compra.metodo_pagamento,
                compra.status_pagamento,
                compra.data_pagamento,
                compra.status_entrega,
                compra.frete,
                compra.cupom_id !== undefined ? compra.cupom_id : null,
                compra.quantidade,
                compra.subtotal, 
                compra.valor_total
            );

        return { 
            id: Number(resultado.lastInsertRowid), 
            cliente_id: compra.cliente_id,
            produto_id: compra.produto_id,
            metodo_pagamento: compra.metodo_pagamento,
            status_pagamento: compra.status_pagamento,
            data_pagamento: compra.data_pagamento,
            status_entrega: compra.status_entrega,
            frete: compra.frete,
            cupom_id: compra.cupom_id,
            quantidade: compra.quantidade,
            subtotal: compra.subtotal, 
            valor_total: compra.valor_total
        };
    }

    listar(): Compra[] {
        return db.prepare("SELECT * FROM compra").all() as Compra[];
    }

    buscarPorId(id: number): Compra | null {
        const resultado = db.prepare("SELECT * FROM compra WHERE id = ?").get(id);
        return resultado ? (resultado as Compra) : null;
    }

    buscarPorCliente(cliente_id: number): Compra[] {
        return db.prepare("SELECT * FROM compra WHERE cliente_id = ?").all(cliente_id) as Compra[];
    }

    atualizarPagamento(id: number, status: string, dataPagamento: string): boolean {
        const resultado = db
            .prepare("UPDATE compra SET status_pagamento = ?, data_pagamento = ? WHERE id = ?")
            .run(status, dataPagamento, id);
            
        return resultado.changes > 0;
    }

    atualizarEntrega(id: number, status: string): boolean {
        const resultado = db
            .prepare("UPDATE compra SET status_entrega = ? WHERE id = ?")
            .run(status, id);
            
        return resultado.changes > 0;
    }
}