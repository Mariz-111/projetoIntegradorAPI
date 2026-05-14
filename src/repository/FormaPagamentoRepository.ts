import db from "../database/database";
import { FormaPagamento } from "../models/formaPagamentoModels";

export class FormaPagamentoRepository {
    salvar(dados: FormaPagamento): FormaPagamento {
        const resultado = db.prepare(`
            INSERT INTO forma_pagamento (tipo_pagamento) VALUES (?)
        `).run(dados.tipoPagamento);

        return {
            id: Number(resultado.lastInsertRowid),
            ...dados
        };
    }

    listar(): FormaPagamento[] {
        return db.prepare("SELECT * FROM forma_pagamento").all() as FormaPagamento[];
    }

    buscarPorId(id: number): FormaPagamento | null {
        const resultado = db.prepare("SELECT * FROM forma_pagamento WHERE id = ?").get(id);
        return resultado ? (resultado as FormaPagamento) : null;
    }

    buscarPorTipoPagamento(tipo: string): FormaPagamento[] {
        return db.prepare("SELECT * FROM forma_pagamento WHERE tipo_pagamento LIKE ?").all(`%${tipo}%`) as FormaPagamento[];
    }
}