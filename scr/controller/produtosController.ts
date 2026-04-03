import { app } from "../server";
import { produtosRepository } from "../repository/produtosRepository";

export function produtosController() {
  const repository = new produtosRepository;

  app.get("/produtos", (req, res) => {
    const { nome, valor, tamanho } = req.query;

    if (nome) {
      const produto = repository.buscarPorNome(nome as string);
      if (!produto) return res.status(404).json({ erro: "Produto nao encontrado" });
      return res.json(produto);
    }

    if (valor) {
      const produto = repository.buscarPorValor(Number(valor));
      if (!produto) return res.status(404).json({ erro: "Produto nao encontrado" });
      return res.json(produto);
    }

    if (tamanho) {
      const produto = repository.buscarPorTamanho(tamanho as string);
      if (!produto) return res.status(404).json({ erro: "Produto nao encontrado" });
      return res.json(produto);
    }

    res.json(repository.listar());
  });

  app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = repository.buscarPorId(id);
    if (!produto) return res.status(404).json({ erro: "Produto nao encontrado" });
    res.json(produto);
  });

  app.post("/produtos", (req, res) => {
    try {
      const { nome, valor, tamanho } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (valor === undefined || Number.isNaN(Number(valor))) throw new Error("Valor invalido");
      if (!tamanho || tamanho.trim().length === 0) throw new Error("Tamanho e obrigatorio");

      const produto = repository.salvar({ nome, valor: Number(valor), tamanho });
      res.status(201).json(produto);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}