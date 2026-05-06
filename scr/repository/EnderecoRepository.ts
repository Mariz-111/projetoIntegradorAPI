import db from "../database/database";
import { Endereco } from "../models/EnderecoModels";

export class EnderecoRepository {

    salvar(endereco: Endereco): Endereco {
        const resultado = db
            .prepare(`
                INSERT INTO endereco (
                    cliente_id, rua, numero, bairro, cidade, estado, cep, complemento
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `)
            .run(
                endereco.cliente_id,
                endereco.rua,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.estado,
                endereco.cep,
                endereco.complemento !== undefined ? endereco.complemento : null
            );

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

    buscarPorClienteId(cliente_id: number): Endereco | null {
        const resultado = db
            .prepare("SELECT * FROM endereco WHERE cliente_id = ?")
            .get(cliente_id);
            
        return resultado ? (resultado as Endereco) : null;
    }

    atualizar(endereco: Endereco): boolean {
        const resultado = db
            .prepare(`
                UPDATE endereco SET 
                    rua = ?, 
                    numero = ?, 
                    bairro = ?, 
                    cidade = ?, 
                    estado = ?, 
                    cep = ?, 
                    complemento = ? 
                WHERE id = ? AND cliente_id = ?
            `)
            .run(
                endereco.rua,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.estado,
                endereco.cep,
                endereco.complemento !== undefined ? endereco.complemento : null,
                endereco.id,
                endereco.cliente_id
            );
            
        return resultado.changes > 0;
    }
}