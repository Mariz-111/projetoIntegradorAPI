import db from "../database/database";
import { FormaPagamento } from "../models/formaPagamentoModels";

export class FormaPagamentoRepository {
    
    salvar(formaPagamento: FormaPagamento): FormaPagamento {
        const resultado = db
            .prepare("INSERT INTO forma_pagamento (tipoPagamento) VALUES (?)")
            .run(formaPagamento.tipoPagamento);

        return { 
            id: Number(resultado.lastInsertRowid), 
            tipoPagamento: formaPagamento.tipoPagamento
        };
    }

    listar(): FormaPagamento[] {
        return db.prepare("SELECT * FROM forma_pagamento").all() as FormaPagamento[];
    }
    
    buscarPorTipo(tipoPagamento: string): FormaPagamento | null {
        const resultado = db
            .prepare("SELECT * FROM forma_pagamento WHERE tipoPagamento = ?")
            .get(tipoPagamento);
            
        return resultado ? (resultado as FormaPagamento) : null;
    }
}