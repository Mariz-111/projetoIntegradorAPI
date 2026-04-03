import db from "../database/database";
import { status_pedido } from "../models/status_pedido";

export class status_pedidoRepository {
  salvar(status_pedido: status_pedido): status_pedido {
    const resultado = db
      .prepare("INSERT INTO status_pedidos (codigo) VALUES (?)")
      .run(status_pedido.codigo);

    return { id: Number(resultado.lastInsertRowid), codigo: status_pedido.codigo};
  }

  listar(): status_pedido[] {
    return db.prepare("SELECT * FROM status_pedido").all() as status_pedido[];
  }

  buscarPorId(id: number): status_pedido | null {
    return (db.prepare("SELECT * FROM status_pedido WHERE id = ?").get(id) as status_pedido) ?? null;
  }

  buscarPorCodigo(
    codigo: status_pedido["codigo"]
  ): status_pedido | null {
    return (
      db
        .prepare(
          "SELECT id, codigo AS codigo FROM status_pedido WHERE codigo LIKE ?"
        )
        .get(`%${codigo}%`) as status_pedido
    ) ?? null;
  }
}