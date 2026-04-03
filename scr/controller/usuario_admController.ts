import { app } from "../server";
import { usuario_adm } from "../models/usuario_adm";
import { usuario_admRepository } from "../repository/usuario_admRepository";

export function usuarioAdmController() {
  const repository = new usuario_admRepository();

  app.get("/usuarios-adm", (req, res) => {
    const { email, senha } = req.query;

    if (email) {
      const usuarioAdm = repository.buscarPorEmail(email as string);
      if (!usuarioAdm) return res.status(404).json({ erro: "Usuario administrador nao encontrado" });
      return res.json(usuarioAdm);
    }

    if (senha) {
      const usuarioAdm = repository.buscarPorSenha(senha as string);
      if (!usuarioAdm) return res.status(404).json({ erro: "Usuario administrador nao encontrado" });
      return res.json(usuarioAdm);
    }

    res.json(repository.listar());
  });

  app.get("/usuarios-adm/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioAdm = repository.buscarPorId(id);
    if (!usuarioAdm) return res.status(404).json({ erro: "Usuario administrador nao encontrado" });
    res.json(usuarioAdm);
  });

  app.post("/usuarios-adm", (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !email.includes("@")) throw new Error("Email invalido");
      if (!senha || senha.trim().length === 0) throw new Error("Senha e obrigatoria");

      const usuarioAdm = repository.salvar({ email, senha });
      res.status(201).json(usuarioAdm);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}