import db from "../database/database";
import { forma_de_pagamento } from "../models/forma_de_pagamento";

export class forma_de_pagamentoRepository {
  salvar(forma_de_pagamento: forma_de_pagamento): forma_de_pagamento {
    const resultado = db
      .prepare("INSERT INTO forma_de_pagamento (tipo_de_pagamento) VALUES (?)")
      .run(forma_de_pagamento.tipo_De_pagamento);

    return {
      id: Number(resultado.lastInsertRowid),
      tipo_De_pagamento: forma_de_pagamento.tipo_De_pagamento,
    };
  }

  listar(): forma_de_pagamento[] {
    return db
      .prepare(
        "SELECT id, tipo_de_pagamento AS tipo_De_pagamento FROM forma_de_pagamento"
      )
      .all() as forma_de_pagamento[];
  }

  buscarPorId(id: number): forma_de_pagamento | null {
    return (
      db
        .prepare(
          "SELECT id, tipo_de_pagamento AS tipo_De_pagamento FROM forma_de_pagamento WHERE id = ?"
        )
        .get(id) as forma_de_pagamento
    ) ?? null;
  }

  buscarPorTipoDePagamento(
    tipo_De_pagamento: forma_de_pagamento["tipo_De_pagamento"]
  ): forma_de_pagamento | null {
    return (
      db
        .prepare(
          "SELECT id, tipo_de_pagamento AS tipo_De_pagamento FROM forma_de_pagamento WHERE tipo_de_pagamento LIKE ?"
        )
        .get(`%${tipo_De_pagamento}%`) as forma_de_pagamento
    ) ?? null;
  }
}