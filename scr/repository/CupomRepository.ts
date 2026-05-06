import db from "../database/database";
import { Cupom } from "../models/Cupom"; 

export class CupomRepository {

    salvar(cupom: Cupom): Cupom {
        const resultado = db
            .prepare("INSERT INTO cupom (codigo, desconto, validade) VALUES (?, ?, ?)")
            .run(cupom.codigo, cupom.desconto, cupom.validade);

        return { 
            id: Number(resultado.lastInsertRowid), 
            codigo: cupom.codigo,
            desconto: cupom.desconto,
            validade: cupom.validade
        };
    }

    listar(): Cupom[] {
        return db.prepare("SELECT * FROM cupom").all() as Cupom[];
    }

    buscarPorCodigo(codigo: string): Cupom | null {
        const resultado = db
            .prepare("SELECT * FROM cupom WHERE codigo = ?")
            .get(codigo);
            
        return resultado ? (resultado as Cupom) : null;
    }
}