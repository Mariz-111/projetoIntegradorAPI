import { app } from "../server";
import { filtro_de_cor } from "../models/filtro_de_cor";
import { filtro_de_corRepository } from "../repository/filtros_de_corRepository";

export function filtroDeCorController() {
  const repository = new filtro_de_corRepository();

  app.get("/filtros-de-cor", (req, res) => {
    const { cor } = req.query;

    if (cor) {
      const filtroDeCor = repository.buscarPorCor(cor as string);
      if (!filtroDeCor) return res.status(404).json({ erro: "Filtro de cor nao encontrado" });
      return res.json(filtroDeCor);
    }

    res.json(repository.listar());
  });

  app.get("/filtros-de-cor/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const filtroDeCor = repository.buscarPorId(id);
    if (!filtroDeCor) return res.status(404).json({ erro: "Filtro de cor nao encontrado" });
    res.json(filtroDeCor);
  });

  app.post("/filtros-de-cor", (req, res) => {
    try {
      const { cor } = req.body;

      if (!cor || cor.trim().length === 0) throw new Error("Cor e obrigatoria");

      const filtroDeCor = repository.salvar({ cor });
      res.status(201).json(filtroDeCor);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}