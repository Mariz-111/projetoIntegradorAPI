import db from "../database/database";
import { cupons } from "../models/cupons";

export class cuponsRepository {
  salvar(cupons: cupons): cupons {
    const resultado = db
      .prepare("INSERT INTO cuponss (nome, email) VALUES (?, ?)")
      .run(cupons);

    return { id: Number(resultado.lastInsertRowid), cupons };
  }

  listar(): cupons[] {
    return db.prepare("SELECT * FROM cuponss").all() as cupons[];
  }

  buscarPorId(id: number): cupons | null {
    return (db.prepare("SELECT * FROM cuponss WHERE id = ?").get(id) as cupons) ?? null;
  }

  buscarPorNome(nome: string): cupons | null {
    return (db.prepare("SELECT * FROM cuponss WHERE nome LIKE ?").get(`%${nome}%`) as cupons) ?? null;
  }
}