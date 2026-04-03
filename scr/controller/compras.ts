import { app } from "../server";
import { comprasRepository } from "../repository/compras";

export function comprasController() {
  const repository = new comprasRepository();

  app.get("/comprass", (req, res) => {
    const { email } = req.query;

    if (email) {
      const compras = repository.comprasRepository(email as string);
      if (!compras) return res.status(404).json({ erro: "compras não encontrado" });
      return res.json(compras);
    }

    res.json(repository.listar());
  });

  app.get("/comprass/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const compras = repository.buscarPorId(id);
    if (!compras) return res.status(404).json({ erro: "compras não encontrado" });
    res.json(compras);
  });

  app.post("/comprass", (req, res) => {
    try {
      const { numero, email } = req.body;

      if (!numero || numero.trim().length === 0) throw new Error("Numero é obrigatório");
      if (!email || !email.includes("@")) throw new Error("Email inválido");

      const compras = repository.salvar({ numero, email });
      res.status(201).json(compras);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}