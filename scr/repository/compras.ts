import db from "../database/database";
import { compras } from "../models/compras";

export class comprasRepository {
  salvar(compras: compras): compras {
    const resultado = db
      .prepare("INSERT INTO comprass (nome, email) VALUES (?, ?)")
      .run(compras);

    return { id: Number(resultado.lastInsertRowid), compras };
  }

  listar(): compras[] {
    return db.prepare("SELECT * FROM comprass").all() as compras[];
  }

  buscarPorId(id: number): compras | null {
    return (db.prepare("SELECT * FROM comprass WHERE id = ?").get(id) as compras) ?? null;
  }

  buscarPorNome(nome: string): compras | null {
    return (db.prepare("SELECT * FROM comprass WHERE nome LIKE ?").get(`%${nome}%`) as compras) ?? null;
  }
}