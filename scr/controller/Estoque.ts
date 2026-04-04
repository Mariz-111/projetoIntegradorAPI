import { app } from "../server";
import { estoque } from "../models/Estoque";
import { estoque } from "../repository/Estoque";

export function estoqueController() {
  const repository = new estoqueRepository();

  app.get("/estoques", (req, res) => {
    const { quantidade_produto } = req.query;

    if (quantidade_produto) {
      const estoque = repository.buscarPorQuantidadeDeProduto(Number(quantidade_produto));
      if (!estoque) return res.status(404).json({ erro: "Estoque nao encontrado" });
      return res.json(estoque);
    }

    res.json(repository.listar());
  });

  app.get("/estoques/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const estoque = repository.buscarPorId(id);
    if (!estoque) return res.status(404).json({ erro: "Estoque nao encontrado" });
    res.json(estoque);
  });

  app.post("/estoques", (req, res) => {
    try {
      const { quantidade_produto } = req.body;

      if (quantidade_produto === undefined || Number.isNaN(Number(quantidade_produto))) throw new Error("Quantidade do produto invalida");

      const estoque = repository.salvar({ quantidade_produto: Number(quantidade_produto) });
      res.status(201).json(estoque);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}