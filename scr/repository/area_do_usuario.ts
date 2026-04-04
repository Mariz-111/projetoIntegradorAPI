import db from "../database/database";
import { AreaDoUsuario } from "../models/area_do_usuario";

export class AreaDoUsuarioRepository {
  salvar(AreaDoUsuario: AreaDoUsuario): AreaDoUsuario {
    const resultado = db
      .prepare("INSERT INTO area_do_usuario (localizacao, nome, numero_de_telefone,cep, rua_avenida, numero_de_casa) VALUES (?, ?, ?, ?, ?, ?)")
      .run(AreaDoUsuario.localizacao, AreaDoUsuario.nome, AreaDoUsuario.numero_de_telefone, AreaDoUsuario.Cep, AreaDoUsuario.rua_avenida, AreaDoUsuario.numero_de_casa);

    return { id: Number(resultado.lastInsertRowid), localizacao: AreaDoUsuario.localizacao, nome: AreaDoUsuario.nome, numero_de_telefone: AreaDoUsuario.numero_de_telefone, Cep: AreaDoUsuario.Cep, rua_avenida: AreaDoUsuario.rua_avenida, numero_de_casa: AreaDoUsuario.numero_de_casa 
       };
  }

  listar(): AreaDoUsuario[] {
    return db.prepare("SELECT * FROM area_do_usuario").all() as AreaDoUsuario[];
  }

  buscarPorId(id: number): AreaDoUsuario | null {
    return (db.prepare("SELECT * FROM area_do_usuario WHERE id = ?").get(id) as AreaDoUsuario) ?? null;
  }

  buscarPorLocalizacao(localizacao: string): AreaDoUsuario | null {
    return (db.prepare("SELECT * FROM area_do_usuario WHERE Localizacao LIKE ?").get(`%${localizacao}%`) as AreaDoUsuario) ?? null;
  }
}