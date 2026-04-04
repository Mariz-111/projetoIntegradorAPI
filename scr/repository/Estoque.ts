import db from "../database/database";
import { estoque } from "../models/estoque";

export class estoqueRepository {
  salvar(estoque: estoque): estoque {
    const resultado = db
      .prepare("INSERT INTO estoque (quantidade_produto) VALUES (?)")
      .run(estoque.quantidade_produto);

    return { id: Number(resultado.lastInsertRowid), quantidade_produto: estoque.quantidade_produto};
  }

  listar(): estoque[] {
    return db.prepare("SELECT * FROM estoque").all() as estoque[];
  }

  buscarPorId(id: number): estoque | null {
    return (db.prepare("SELECT * FROM estoque WHERE id = ?").get(id) as estoque) ?? null;
  }

  buscarPorQuantidadeDeProduto(quantidade_produto: number): estoque | null {
    return (db.prepare("SELECT * FROM estoque WHERE nome LIKE ?").get(`%${quantidade_produto}%`) as estoque) ?? null;
  }
}