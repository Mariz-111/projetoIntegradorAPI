import { app } from "../server";
import { status_pedido } from "../models/status_pedido";
import { status_pedidoRepository } from "../repository/status_pedidoRepository";

export function statusPedidoController() {
  const repository = new status_pedidoRepository();

  app.get("/status-pedido", (req, res) => {
    const { codigo } = req.query;

    if (codigo) {
      const statusPedido = repository.buscarPorCodigo(
        codigo as "pendente" | "pago" | "separação" | "enviado" | "entregue" | "cancelado"
      );
      if (!statusPedido) return res.status(404).json({ erro: "Status do pedido nao encontrado" });
      return res.json(statusPedido);
    }

    res.json(repository.listar());
  });

  app.get("/status-pedido/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const statusPedido = repository.buscarPorId(id);
    if (!statusPedido) return res.status(404).json({ erro: "Status do pedido nao encontrado" });
    res.json(statusPedido);
  });

  app.post("/status-pedido", (req, res) => {
    try {
      const { codigo } = req.body;

      if (!codigo || codigo.trim().length === 0) throw new Error("Codigo e obrigatorio");

      const statusPedido = repository.salvar({ codigo });
      res.status(201).json(statusPedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}