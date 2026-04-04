import db from "../database/database";
import { filtro_de_cor } from "../models/filtro_de_cor";

export class filtro_de_corRepository {
  salvar(filtro_de_cor: filtro_de_cor): filtro_de_cor {
    const resultado = db
      .prepare("INSERT INTO filtro_de_cor (cor) VALUES (?)")
      .run(filtro_de_cor.cor);

    return { id: Number(resultado.lastInsertRowid), cor: filtro_de_cor.cor};
  }

  listar(): filtro_de_cor[] {
    return db.prepare("SELECT * FROM filtro_de_cor").all() as filtro_de_cor[];
  }

  buscarPorId(id: number): filtro_de_cor | null {
    return (db.prepare("SELECT * FROM filtro_de_cor WHERE id = ?").get(id) as filtro_de_cor) ?? null;
  }

  buscarPorCor(cor: string): filtro_de_cor | null {
    return (db.prepare("SELECT * FROM filtro_de_cor WHERE nome LIKE ?").get(`%${cor}%`) as filtro_de_cor) ?? null;
  }
}