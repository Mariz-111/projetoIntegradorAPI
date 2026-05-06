import db from "../database/database";
import { Cliente } from "../models/cliente"; 

export class ClienteRepository {
    
    salvar(cliente: Cliente): Cliente {
        const resultado = db
            .prepare("INSERT INTO cliente (nome, telefone, cpf, email) VALUES (?, ?, ?, ?)")
            .run(cliente.nome, cliente.telefone, cliente.cpf, cliente.email);

        return { 
            id: Number(resultado.lastInsertRowid), 
            nome: cliente.nome, 
            telefone: cliente.telefone,
            cpf: cliente.cpf,
            email: cliente.email
        };

    }

    listar(): Cliente[] {
        return db.prepare("SELECT * FROM clientes").all() as Cliente[];
    }

    // Busca um Cliente pelo nome na tabela "clientes"
    buscarPorNome(nome: string): Cliente | null {
        return db.prepare("SELECT * FROM cliente WHERE nome = ?").get(nome) as Cliente | null;
    }

    buscarPorTelefone(telefone: number): Cliente | null {
        return db.prepare("SELECT * FROM cliente WHERE telefone LIKE ?").get(telefone) as Cliente | null;
    }

    buscarPorCpf(cpf: number): Cliente | null {
        return db.prepare("SELECT * FROM cliente WHERE cpf LIKE ?").get(cpf) as Cliente | null;
    }

    buscarPorEmail(email: string): Cliente | null {
        return db.prepare("SELECT * FROM cliente WHERE email LIKE ?").get(email) as Cliente | null;
    }
}