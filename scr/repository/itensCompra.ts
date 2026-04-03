import db from "../database/database";
import { itens_compra } from "../models/itens_compra";

export class itens_compraRepository {
  salvar(itens_compra: itens_compra): itens_compra {
    const resultado = db
      .prepare("INSERT INTO itens_compras (nome, email) VALUES (?, ?)")
      .run(itens_compra.nome, itens_compra.email);

    return { id: Number(resultado.lastInsertRowid), nome: itens_compra.nome, email: itens_compra.email };
  }

  listar(): itens_compra[] {
    return db.prepare("SELECT * FROM itens_compras").all() as itens_compra[];
  }

  buscarPorId(id: number): itens_compra | null {
    return (db.prepare("SELECT * FROM itens_compras WHERE id = ?").get(id) as itens_compra) ?? null;
  }

  buscarPorNome(nome: string): itens_compra | null {
    return (db.prepare("SELECT * FROM itens_compras WHERE nome LIKE ?").get(`%${nome}%`) as itens_compra) ?? null;
  }
}