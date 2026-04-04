import db from "../database/database";
import { itens_pedido } from "../models/itens_pedido";

export class itens_pedidoRepository {
  salvar(itens_pedido: itens_pedido): itens_pedido {
    const resultado = db
      .prepare("INSERT INTO itens_pedidos (quantidade, preco) VALUES (?, ?)")
      .run(itens_pedido.quantidade, itens_pedido.preco);

    return { id: Number(resultado.lastInsertRowid), quantidade: itens_pedido.quantidade, preco: itens_pedido.preco };
  }

  listar(): itens_pedido[] {
    return db.prepare("SELECT * FROM itens_pedido").all() as itens_pedido[];
  }

  buscarPorId(id: number): itens_pedido | null {
    return (db.prepare("SELECT * FROM itens_pedido WHERE id = ?").get(id) as itens_pedido) ?? null;
  }

  buscarPorQuantidade(quantidade: number): itens_pedido | null {
    return (db.prepare("SELECT * FROM itens_pedido WHERE nome LIKE ?").get(`%${quantidade}%`) as itens_pedido) ?? null;
  }
  
  buscarPorPreco(preco: number): itens_pedido | null {
    return (db.prepare("SELECT * FROM itens_pedido WHERE nome LIKE ?").get(`%${preco}%`) as itens_pedido) ?? null;
  }
}