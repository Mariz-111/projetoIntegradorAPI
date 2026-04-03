import db from "../database/database";
import { categoria } from "../models/categoria";

export class CategoriaRepository {
  salvar(categoria: categoria): categoria {
    const resultado = db
      .prepare("INSERT INTO categoria (nome, descricao) VALUES (?, ?)")
      .run(categoria.nome, categoria.descricao);

    return { id: Number(resultado.lastInsertRowid), nome: categoria.nome, descricao: categoria.descricao };
  }

  listar(): categoria[] {
    return db.prepare("SELECT * FROM categoria").all() as categoria[];
  }

  buscarPorId(id: number): categoria | null {
    return (db.prepare("SELECT * FROM categoria WHERE id = ?").get(id) as categoria) ?? null;
  }

  buscarPorNome(nome: string): categoria | null {
    return (db.prepare("SELECT * FROM categoria WHERE nome LIKE ?").get(`%${nome}%`) as categoria) ?? null;
  }
}