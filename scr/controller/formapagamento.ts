import { app } from "../server";
import { FormaDePagamentoRepository } from "../Repositories/FormaDePagamento";

export function FormaDePagamentoControllers() {
  const repository = new FormaDePagamentoRepository();

  app.get("/formas-pagamento", (req, res) => {
    const { tipo_de_pagamento } = req.query;

    if (tipo_de_pagamento) {
      const formasFiltradas = repository.buscarPorTipo(tipo_de_pagamento as string);
      return res.json(formasFiltradas);
    }

    res.json(repository.listar());
  });

  app.get("/formas-pagamento/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const formaPagamento = repository.buscarPorId(id);
    if (!formaPagamento) return res.status(404).json({ erro: "Forma de pagamento não encontrada" });
    res.json(formaPagamento);
  });

  app.post("/formas-pagamento", (req, res) => {
    try {
      const { tipo_de_pagamento } = req.body;

      if (!tipo_de_pagamento || tipo_de_pagamento.trim().length === 0) {
        throw new Error("Tipo de pagamento é obrigatório");
      }

      const formaPagamento = repository.salvar({
        tipo_de_pagamento
      });

      res.status(201).json(formaPagamento);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}