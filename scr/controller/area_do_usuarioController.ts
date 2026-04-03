import { app } from "../server";
import { AreaDoUsuario } from "../models/area_do_usuario"
import { AreaDoUsuarioRepository } from "../repository/area_do_usuarioRepository.ts";

export function areaDoUsuarioController() {
  const repository = new AreaDoUsuarioRepository();

  app.get("/areas-do-usuario", (req, res) => {
    const { localizacao } = req.query;

    if (localizacao) {
      const areaDoUsuario = repository.buscarPorLocalizacao(localizacao as string);
      if (!areaDoUsuario) return res.status(404).json({ erro: "Area do usuario nao encontrada" });
      return res.json(areaDoUsuario);
    }

    res.json(repository.listar());
  });

  app.get("/areas-do-usuario/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const areaDoUsuario = repository.buscarPorId(id);
    if (!areaDoUsuario) return res.status(404).json({ erro: "Area do usuario nao encontrada" });
    res.json(areaDoUsuario);
  });

  app.post("/areas-do-usuario", (req, res) => {
    try {
      const { localizacao, nome, numero_de_telefone, Cep, rua_avenida, numero_de_casa } = req.body;

      if (!localizacao || localizacao.trim().length === 0) throw new Error("Localizacao e obrigatoria");
      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (numero_de_telefone === undefined || Number.isNaN(Number(numero_de_telefone))) throw new Error("Numero de telefone invalido");
      if (Cep === undefined || Number.isNaN(Number(Cep))) throw new Error("Cep invalido");
      if (!rua_avenida || rua_avenida.trim().length === 0) throw new Error("Rua ou avenida e obrigatoria");
      if (numero_de_casa === undefined || Number.isNaN(Number(numero_de_casa))) throw new Error("Numero de casa invalido");

      const areaDoUsuario = repository.salvar({
        localizacao,
        nome,
        numero_de_telefone: Number(numero_de_telefone),
        Cep: Number(Cep),
        rua_avenida,
        numero_de_casa: Number(numero_de_casa),
      });
      res.status(201).json(areaDoUsuario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}