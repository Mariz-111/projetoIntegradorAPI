import { app } from "../server";
import { PedidoRepository } from "../repository/PedidoRepository";

export function PedidoControllers() {
  const repository = new PedidoRepository();

  app.get("/pedidos", (req, res) => {
    const { cliente_id } = req.query;

    if (cliente_id) {
      const pedidosCliente = repository.buscarPorCliente(parseInt(cliente_id as string));
      return res.json(pedidosCliente);
    }

    res.json(repository.listar());
  });

  app.get("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = repository.buscarPorId(id);
    if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
    res.json(pedido);
  });

  app.post("/pedidos", (req, res) => {
    try {
      const {
        cliente_id,
        data_pedido,
        pagamento_id,
        status_pedido,
        subtotal,
        frete
      } = req.body;

      if (!cliente_id) throw new Error("ID do cliente é obrigatório");
      if (!data_pedido || data_pedido.trim().length === 0) {
        throw new Error("Data do pedido é obrigatória");
      }
      if (!pagamento_id) throw new Error("ID da forma de pagamento é obrigatório");
      if (!status_pedido || status_pedido.trim().length === 0) {
        throw new Error("Status do pedido é obrigatório");
      }
      if (subtotal === undefined || subtotal < 0) {
        throw new Error("Subtotal inválido");
      }
      if (frete === undefined || frete < 0) {
        throw new Error("Frete inválido");
      }

      const pedido = repository.salvar({
        cliente_id,
        data_pedido,
        pagamento_id,
        status_pedido,
        subtotal,
        frete
      });

      res.status(201).json(pedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}