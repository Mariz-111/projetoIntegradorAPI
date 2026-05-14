import { Request, Response } from "express";
import { app } from "../server";
import { ClienteRepository } from "../repository/ClienteRepository";

export function ClienteControllers() {
  const repository = new ClienteRepository();

  app.get("/clientes", (req: Request, res: Response) => {
    const { email } = req.query;

    if (email) { 
      const cliente = repository.buscarPorEmail(email as string);
      if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });
      return res.json(cliente);
    }

    res.json(repository.listar());
  });

  app.get("/clientes/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.ID as string);
    const cliente = repository.buscarPorId(id);
    if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });
    res.json(cliente);
  });

  app.post("/clientes", (req: Request, res: Response) => {
    try { const { nome, telefone, cpf, email } = req.body;

      if (!nome || nome.trim().length === 0) {throw new Error("Nome é obrigatório"); }
      if (!cpf || cpf.trim().length === 0) {throw new Error("CPF é obrigatório");}
      if (!email || !email.includes("@")) {throw new Error("Email inválido");}

      const cliente = repository.salvar({ nome, telefone, cpf, email });

      res.status(201).json(cliente);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}