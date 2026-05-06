import db from "../database/database";
import { Pedido } from "../models/PedidoModels";

export class PedidoRepository {
    
    salvar(pedido: Pedido): Pedido {
        const resultado = db
            .prepare(`
                INSERT INTO pedido (
                    cliente_id, 
                    data_pedido, 
                    pagamento_id, 
                    status_pedido, 
                    subtotal, 
                    frete, 
                    cupom_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `)
            .run(
                pedido.cliente_id, 
                pedido.data_pedido, 
                pedido.pagamento_id, 
                pedido.status_pedido, 
                pedido.subtotal, 
                pedido.frete,
                pedido.cupom_id !== undefined ? pedido.cupom_id : null
            );

        return { 
            id: Number(resultado.lastInsertRowid), 
            cliente_id: pedido.cliente_id,
            data_pedido: pedido.data_pedido,
            pagamento_id: pedido.pagamento_id,
            status_pedido: pedido.status_pedido,
            subtotal: pedido.subtotal,
            frete: pedido.frete,
            cupom_id: pedido.cupom_id
        };
    }

    listar(): Pedido[] {
        return db.prepare("SELECT * FROM pedido").all() as Pedido[];
    }
    
    buscarPorId(id: number): Pedido | null {
        const resultado = db
            .prepare("SELECT * FROM pedido WHERE id = ?")
            .get(id);
            
        return resultado ? (resultado as Pedido) : null;
    }

    buscarPorCliente(cliente_id: number): Pedido[] {
        return db
            .prepare("SELECT * FROM pedido WHERE cliente_id = ?")
            .all(cliente_id) as Pedido[];
    }

    atualizarStatus(id: number, novoStatus: string): boolean {
        const resultado = db
            .prepare("UPDATE pedido SET status_pedido = ? WHERE id = ?")
            .run(novoStatus, id);
            
        return resultado.changes > 0;
    }
}