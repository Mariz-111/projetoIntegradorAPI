import { app } from "../server";
import { CupomRepository } from "../repository/CupomRepository";

export function CupomController() {
  const repository = new CupomRepository();

  app.get("/Cupom", (req, res) => {
    const { codigo } = req.query;

    if (codigo) {
      const Cupom = repository.buscarPorCodigo(codigo as string);
      if (!Cupom) return res.status(404).json({ erro: "Código invalido" });
      return res.json(Cupom);
    }

    res.json(repository.listar());
  });

  app.get("/Cupom/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const Cupom = repository.buscarPorId(id);
    if (!Cupom) return res.status(404).json({ erro: "Cupom não encontrado" });
    res.json(Cupom);
  });

  app.post("/Cupom", (req, res) => {
    try {
      const {codigo, desconto, validade} = req.body;

      if (!codigo || codigo.trim().length === 0) throw new Error("Código é obrigatório");
      if (!desconto || desconto.trim().length === 0) throw new Error("Desconto valido");
      if (!validade || validade.trim().length === 0) throw new Error("Validade Vencida");

      const Cupom = repository.salvar({ codigo, desconto, validade });
      res.status(201).json(Cupom);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}