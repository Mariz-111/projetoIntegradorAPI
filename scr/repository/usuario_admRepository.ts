import db from "../database/database";
import { usuario_adm } from "../models/usuario_adm";

export class usuario_admRepository {
  salvar(usuario_adm: usuario_adm): usuario_adm {
    const resultado = db
      .prepare("INSERT INTO usuario_adms (email, senha) VALUES (?, ?)")
      .run(usuario_adm.email, usuario_adm.senha);

    return { id: Number(resultado.lastInsertRowid), email: usuario_adm.email, senha: usuario_adm.senha };
  }

  listar(): usuario_adm[] {
    return db.prepare("SELECT * FROM usuario_adm").all() as usuario_adm[];
  }

  buscarPorId(id: number): usuario_adm | null {
    return (db.prepare("SELECT * FROM usuario_adm WHERE id = ?").get(id) as usuario_adm) ?? null;
  }

  buscarPorEmail(email: string): usuario_adm | null {
    return (db.prepare("SELECT * FROM usuario_adm WHERE nome LIKE ?").get(`%${email}%`) as usuario_adm) ?? null;
  }
  buscarPorSenha(senha: string): usuario_adm | null {
    return (db.prepare("SELECT * FROM usuario_adm WHERE nome LIKE ?").get(`%${senha}%`) as usuario_adm) ?? null;
  }
}