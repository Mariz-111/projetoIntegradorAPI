import { app } from "../server";
import { pedidos } from "../models/pedidos";
import { pedidosRepository } from "../repository/pedidosRepository";

export function pedidoController() {
  const repository = new pedidosRepository();

  app.get("/pedidos", (req, res) => {
    const { subtotal, preco } = req.query;

    if (subtotal) {
      const pedido = repository.buscarPorSubtotal(Number(subtotal));
      if (!pedido) return res.status(404).json({ erro: "Pedido nao encontrado" });
      return res.json(pedido);
    }

    if (preco) {
      const pedido = repository.buscarPorPreco(Number(preco));
      if (!pedido) return res.status(404).json({ erro: "Pedido nao encontrado" });
      return res.json(pedido);
    }

    res.json(repository.listar());
  });

  app.get("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = repository.buscarPorId(id);
    if (!pedido) return res.status(404).json({ erro: "Pedido nao encontrado" });
    res.json(pedido);
  });

  app.post("/pedidos", (req, res) => {
    try {
      const { subtotal, frete } = req.body;

      if (subtotal === undefined || Number.isNaN(Number(subtotal))) throw new Error("Subtotal invalido");
      if (frete === undefined || Number.isNaN(Number(frete))) throw new Error("Frete invalido");

      const pedido = repository.salvar({ subtotal: Number(subtotal), frete: Number(frete) });
      res.status(201).json(pedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}