import db from "../database/database";
import { produtos } from "../models/produtos";

export class produtosRepository {
  salvar(produtos: produtos): produtos {
    const resultado = db
      .prepare("INSERT INTO produtoss (nome, valor, tamanho) VALUES (?, ?, ?)")
      .run(produtos.nome, produtos.valor, produtos.tamanho);

    return { id: Number(resultado.lastInsertRowid), nome: produtos.nome, valor: produtos.valor, tamanho:produtos.tamanho };
  }

  listar(): produtos[] {
    return db.prepare("SELECT * FROM produtos").all() as produtos[];
  }

  buscarPorId(id: number): produtos | null {
    return (db.prepare("SELECT * FROM produtos WHERE id = ?").get(id) as produtos) ?? null;
  }

  buscarPorNome(nome: string): produtos | null {
    return (db.prepare("SELECT * FROM produtos WHERE nome LIKE ?").get(`%${nome}%`) as produtos) ?? null;
  }

  buscarPorValor(valor: number): produtos | null {
    return (db.prepare("SELECT * FROM produtos WHERE nome LIKE ?").get(`%${valor}%`) as produtos) ?? null;
  }
  
  buscarPorTamanho(tamanho: string): produtos | null {
    return (db.prepare("SELECT * FROM produtos WHERE nome LIKE ?").get(`%${tamanho}%`) as produtos) ?? null;
  }
}