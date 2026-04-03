import db from "../database/database";
import { pedidos } from "../models/pedidos";

export class pedidosRepository {
  salvar(pedidos: pedidos): pedidos {
    const resultado = db
      .prepare("INSERT INTO pedidoss (subtotal, frete) VALUES (?, ?)")
      .run(pedidos.subtotal, pedidos.frete);

    return { id: Number(resultado.lastInsertRowid), subtotal: pedidos.subtotal, frete: pedidos.frete };
  }

  listar(): pedidos[] {
    return db.prepare("SELECT * FROM pedidos").all() as pedidos[];
  }

  buscarPorId(id: number): pedidos | null {
    return (db.prepare("SELECT * FROM pedidos WHERE id = ?").get(id) as pedidos) ?? null;
  }

  buscarPorSubtotal(subtotal: number): pedidos | null {
    return (db.prepare("SELECT * FROM itens_pedido WHERE nome LIKE ?").get(`%${subtotal}%`) as pedidos) ?? null;
  }
  buscarPorPreco(preco: number): pedidos | null {
    return (db.prepare("SELECT * FROM itens_pedido WHERE nome LIKE ?").get(`%${preco}%`) as pedidos) ?? null;
  }
}