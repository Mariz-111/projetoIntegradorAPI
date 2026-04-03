import { app } from "../server";
import { itens_compra} from "../models/itensCompra
import { itens_compraRepository } from "../repository/itensCompra";

export function itensPedidoController() {
  const repository = new itens_compraRepository();

  app.get("/itens-pedido", (req, res) => {
    const { quantidade, preco } = req.query;

    if (quantidade) {
      const itemPedido = repository.buscarPorQuantidade(Number(quantidade));
      if (!itemPedido) return res.status(404).json({ erro: "Item do pedido nao encontrado" });
      return res.json(itemPedido);
    }

    if (preco) {
      const itemPedido = repository.buscarPorPreco(Number(preco));
      if (!itemPedido) return res.status(404).json({ erro: "Item do pedido nao encontrado" });
      return res.json(itemPedido);
    }

    res.json(repository.listar());
  });

  app.get("/itens-pedido/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const itemPedido = repository.buscarPorId(id);
    if (!itemPedido) return res.status(404).json({ erro: "Item do pedido nao encontrado" });
    res.json(itemPedido);
  });

  app.post("/itens-pedido", (req, res) => {
    try {
      const { quantidade, preco } = req.body;

      if (quantidade === undefined || Number.isNaN(Number(quantidade))) throw new Error("Quantidade invalida");
      if (preco === undefined || Number.isNaN(Number(preco))) throw new Error("Preco invalido");

      const itemPedido = repository.salvar({ quantidade: Number(quantidade), preco: Number(preco) });
      res.status(201).json(itemPedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}