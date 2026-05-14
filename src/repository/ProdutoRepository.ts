import db from "../database/database";
import { Produto } from "../models/ProdutoModels";

export class ProdutoRepository {

    salvar(produto: Produto): Produto {
        const resultado = db
            .prepare("INSERT INTO produto (nome, preco, descricao, estoque) VALUES (?, ?, ?, ?)")
            .run(produto.nome, produto.preco, produto.descricao, produto.estoque);

        return { 
            id: Number(resultado.lastInsertRowid), 
            nome: produto.nome,
            preco: produto.preco,
            descricao: produto.descricao,
            estoque: produto.estoque
        };
    }

    listar(): Produto[] {
        return db.prepare("SELECT * FROM produto").all() as Produto[];
    }

    buscarPorId(id: number): Produto | null {
        const resultado = db.prepare("SELECT * FROM produto WHERE id = ?").get(id);
        return resultado ? (resultado as Produto) : null;
    }
}