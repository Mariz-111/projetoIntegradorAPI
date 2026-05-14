import { app } from "../server";
import { CompraRepository } from "../repository/CompraRepository";

export function CompraControllers() {
  const repository = new CompraRepository();

  app.get("/compras", (req, res) => {
    const { cliente_id } = req.query;

    if (cliente_id) {
      const comprasCliente = repository.buscarPorCliente(parseInt(cliente_id as string));
      return res.json(comprasCliente);
    }

    res.json(repository.listar());
  });

  app.get("/compras/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const compra = repository.buscarPorId(id);
    if (!compra) return res.status(404).json({ erro: "Compra não encontrada" });
    res.json(compra);
  });

  app.post("/compras", (req, res) => {
    try {
      const {
        cliente_id,
        produto_id,
        metodo_pagamento,
        status_pagamento,
        data_pagamento,
        status_entrega,
        frete,
        cupom_id,
        quantidade,
        subtotal,
        valor_total
      } = req.body;

      if (!cliente_id) throw new Error("ID do cliente é obrigatório");
      if (!produto_id) throw new Error("ID do produto é obrigatório");
      if (!metodo_pagamento || metodo_pagamento.trim().length === 0) {
        throw new Error("Método de pagamento é obrigatório");
      }
      if (!quantidade || quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
      }
      if (subtotal === undefined || subtotal < 0) {
        throw new Error("Subtotal inválido");
      }
      if (valor_total === undefined || valor_total < 0) {
        throw new Error("Valor total inválido");
      }

      const compra = repository.salvar({
        cliente_id,
        produto_id,
        metodo_pagamento,
        status_pagamento: status_pagamento || "Pendente",
        data_pagamento,
        status_entrega: status_entrega || "Em processamento",
        frete: frete !== undefined ? frete : 0.0,
        cupom_id,
        quantidade,
        subtotal,
        valor_total
      });

      res.status(201).json(compra);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}