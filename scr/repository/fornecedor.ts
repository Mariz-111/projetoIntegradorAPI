import db from "../database/database";
import { fornecedor } from "../models/fornecedor";

export class fornecedorRepository {
  salvar(fornecedor: fornecedor): fornecedor {
    const resultado = db
      .prepare("INSERT INTO fornecedors (nome_empresa, cnpj, telefone, email, endereco, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      .run(fornecedor.nome_empresa, fornecedor.email);

    return { id: Number(resultado.lastInsertRowid), nome_empresa: fornecedor.nome_empresa,
        cnpj: fornecedor.cnpj,
        telefone: fornecedor.telefone,
        email: fornecedor.email,
        endereco: fornecedor.endereco,
        cidade: fornecedor.cidade,
        estado: fornecedor.estado,
        cep: fornecedor.cep};
  }

  listar(): fornecedor[] {
    return db.prepare("SELECT * FROM fornecedor").all() as fornecedor[];
  }

  buscarPorId(id: number): fornecedor | null {
    return (db.prepare("SELECT * FROM fornecedor WHERE id = ?").get(id) as fornecedor) ?? null;
  }

  buscarPorTelefone(telefone: string): fornecedor | null {
    return (db.prepare("SELECT * FROM fornecedor WHERE nome LIKE ?").get(`%${telefone}%`) as fornecedor) ?? null;
  }
  buscarPorEmail(email: string): fornecedor | null {
    return (db.prepare("SELECT * FROM fornecedor WHERE nome LIKE ?").get(`%${email}%`) as fornecedor) ?? null;
  }
  buscarPorEndereco(endereco: string): fornecedor | null {
    return (db.prepare("SELECT * FROM fornecedor WHERE nome LIKE ?").get(`%${endereco}%`) as fornecedor) ?? null;
  }
  buscarPorCidade(cidade: string): fornecedor | null {
    return (db.prepare("SELECT * FROM fornecedor WHERE nome LIKE ?").get(`%${cidade}%`) as fornecedor) ?? null;
  }
  buscarPorEstado(estado: string): fornecedor | null {
    return (db.prepare("SELECT * FROM fornecedor WHERE nome LIKE ?").get(`%${estado}%`) as fornecedor) ?? null;
  }
  buscarPorCep(cep: string): fornecedor | null {
    return (db.prepare("SELECT * FROM fornecedor WHERE nome LIKE ?").get(`%${cep}%`) as fornecedor) ?? null;
  }
}