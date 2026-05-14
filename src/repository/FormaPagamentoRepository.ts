import db from "../database/database";
import { FormaPagamento } from "../models/formaPagamentoModels";

export class FormaPagamentoRepository {
    salvar(dados: FormaPagamento): FormaPagamento {
        const resultado = db
            .prepare(`INSERT INTO formapagamento (tipopagamento) VALUES (?)`)
            .run(dados.tipoPagamento);

        return {
            id: Number(resultado.lastInsertRowid),
            ...dados
        };
    }

    listar(): FormaPagamento[] {
        return db.prepare("SELECT * FROM formapagamento").all() as FormaPagamento[];
    }

    buscarPorId(id: number): FormaPagamento | null {
        const resultado = db.prepare("SELECT * FROM formapagamento WHERE id = ?").get(id);
        return resultado ? (resultado as FormaPagamento) : null;
    }

    buscarPorTipoPagamento(tipo: string): FormaPagamento[] {
        return db.prepare("SELECT * FROM formapagamento WHERE tipopagamento LIKE ?").all(`%${tipo}%`) as FormaPagamento[];
    }
}