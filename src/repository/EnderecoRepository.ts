import db from "../database/database";
import { Endereco } from "../models/EnderecoModels";

export class EnderecoRepository {
    salvar(endereco: Endereco): Endereco {
        const resultado = db
            .prepare(` INSERT INTO endereco (cliente_id, rua, numero, bairro, cidade, estado, cep, complemento ) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `)
            .run( endereco.cliente_id, endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, endereco.cep, endereco.complemento );

        return {
            id: Number(resultado.lastInsertRowid),
            cliente_id: endereco.cliente_id,
            rua: endereco.rua,
            numero: endereco.numero,
            bairro: endereco.bairro, 
            cidade: endereco.cidade,
            estado: endereco.estado,
            cep: endereco.cep,
            complemento: endereco.complemento
        };
    }

    listar(): Endereco[] {
        return db.prepare("SELECT * FROM endereco").all() as Endereco[];
    }

    buscarPorId(id: number): Endereco | null {
        const resultado = db.prepare("SELECT * FROM endereco WHERE id = ?").get(id);
        return resultado ? (resultado as Endereco) : null;
    }

    buscarPorClienteId(cliente_id: number): Endereco[] {
        return db.prepare("SELECT * FROM endereco WHERE cliente_id = ?").all(cliente_id) as Endereco[];
    }
}