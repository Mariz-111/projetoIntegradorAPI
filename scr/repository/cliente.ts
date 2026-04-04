import db from "../database/database";
import { Cliente } from "../models/cliente";

export class ClienteRepository {
  salvar(cliente: Cliente): Cliente {
    const resultado = db
      .prepare("INSERT INTO clientes (numero, email) VALUES (?, ?)")
      .run(cliente.numero, cliente.email);

    return { id: Number(resultado.lastInsertRowid), numero: cliente.numero, email: cliente.email };
  }

  listar(): Cliente[] {
    return db.prepare("SELECT * FROM cliente").all() as Cliente[];
  }

  buscarPorId(id: number): Cliente | null {
    return (db.prepare("SELECT * FROM cliente WHERE id = ?").get(id) as Cliente) ?? null;
  }

  buscarPorEmail(email: string): Cliente | null {
    return (db.prepare("SELECT * FROM cliente WHERE email LIKE ?").get(`%${email}%`) as Cliente) ?? null;
  }
}