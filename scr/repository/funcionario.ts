import db from "../database/database";
import { funcionario } from "../models/funcionario";

export class funcionarioRepository {
  salvar(funcionario: funcionario): funcionario {
    const resultado = db
      .prepare("INSERT INTO funcionarios (nome, email) VALUES (?, ?)")
      .run(funcionario);

    return { id: Number(resultado.lastInsertRowid), funcionario};
  }

  listar(): funcionario[] {
    return db.prepare("SELECT * FROM funcionarios").all() as funcionario[];
  }

  buscarPorId(id: number): funcionario | null {
    return (db.prepare("SELECT * FROM funcionarios WHERE id = ?").get(id) as funcionario) ?? null;
  }

  buscarPorNome(nome: string): funcionario | null {
    return (db.prepare("SELECT * FROM funcionarios WHERE nome LIKE ?").get(`%${nome}%`) as funcionario) ?? null;
  }
}