import { app } from "../server";
import { estoque_relatorio } from "../models/estoque_relatorio";
import { EstoqueRelatorioRepository } from "../repository/Estoque";

export function estoqueRelatorioController() {
  const repository = new EstoqueRelatorioRepository();

  app.get("/estoque-relatorios", (req, res) => {
    const { registro_movimentacao } = req.query;

    if (registro_movimentacao) {
      const estoqueRelatorio = repository.buscarPorestoque(registro_movimentacao as string);
      if (!estoqueRelatorio) return res.status(404).json({ erro: "Estoque relatorio nao encontrado" });
      return res.json(estoqueRelatorio);
    }

    res.json(repository.listar());
  });

  app.get("/estoque-relatorios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const estoqueRelatorio = repository.buscarPorId(id);
    if (!estoqueRelatorio) return res.status(404).json({ erro: "Estoque relatorio nao encontrado" });
    res.json(estoqueRelatorio);
  });

  app.post("/estoque-relatorios", (req, res) => {
    try {
      const { entrada_mercadoria, saida_de_troca, saida_venda, registro_movimentacao } = req.body;

      if (!entrada_mercadoria) throw new Error("Entrada de mercadoria e obrigatoria");
      if (!saida_de_troca) throw new Error("Saida de troca e obrigatoria");
      if (!saida_venda) throw new Error("Saida de venda e obrigatoria");
      if (!registro_movimentacao || registro_movimentacao.trim().length === 0) throw new Error("Registro de movimentacao e obrigatorio");

      const estoqueRelatorio = repository.salvar({
        entrada_mercadoria: new Date(entrada_mercadoria),
        saida_de_troca: new Date(saida_de_troca),
        saida_venda: new Date(saida_venda),
        registro_movimentacao,
      });
      res.status(201).json(estoqueRelatorio);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}