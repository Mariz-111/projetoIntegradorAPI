import { app } from "../server";
import { cuponsRepository } from "../repositories/cuponsRepository";

export function cuponsController() {
  const repository = new cuponsRepository();

  app.get("/cuponss", (req, res) => {
    const { email } = req.query;

    if (email) {
      const cupons = repository.buscarPorEmail(email as string);
      if (!cupons) return res.status(404).json({ erro: "cupons não encontrado" });
      return res.json(cupons);
    }

    res.json(repository.listar());
  });

  app.get("/cuponss/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cupons = repository.buscarPorId(id);
    if (!cupons) return res.status(404).json({ erro: "cupons não encontrado" });
    res.json(cupons);
  });

  app.post("/cuponss", (req, res) => {
    try {
      const { numero, email } = req.body;

      if (!numero || numero.trim().length === 0) throw new Error("Numero é obrigatório");
      if (!email || !email.includes("@")) throw new Error("Email inválido");

      const cupons = repository.salvar({ numero, email });
      res.status(201).json(cupons);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}