import { app } from "../server";
import { fornecedor } from "../models/fornecedor";
import { fornecedorRepository } from "../repository/fornecedorRepository";

export function fornecedorController() {
  const repository = new fornecedorRepository();

  app.get("/fornecedores", (req, res) => {
    const { telefone, email, endereco, cidade, estado, cep } = req.query;

    if (telefone) {
      const fornecedor = repository.buscarPorTelefone(telefone as string);
      if (!fornecedor) return res.status(404).json({ erro: "Fornecedor nao encontrado" });
      return res.json(fornecedor);
    }

    if (email) {
      const fornecedor = repository.buscarPorEmail(email as string);
      if (!fornecedor) return res.status(404).json({ erro: "Fornecedor nao encontrado" });
      return res.json(fornecedor);
    }

    if (endereco) {
      const fornecedor = repository.buscarPorEndereco(endereco as string);
      if (!fornecedor) return res.status(404).json({ erro: "Fornecedor nao encontrado" });
      return res.json(fornecedor);
    }

    if (cidade) {
      const fornecedor = repository.buscarPorCidade(cidade as string);
      if (!fornecedor) return res.status(404).json({ erro: "Fornecedor nao encontrado" });
      return res.json(fornecedor);
    }

    if (estado) {
      const fornecedor = repository.buscarPorEstado(estado as string);
      if (!fornecedor) return res.status(404).json({ erro: "Fornecedor nao encontrado" });
      return res.json(fornecedor);
    }

    if (cep) {
      const fornecedor = repository.buscarPorCep(cep as string);
      if (!fornecedor) return res.status(404).json({ erro: "Fornecedor nao encontrado" });
      return res.json(fornecedor);
    }

    res.json(repository.listar());
  });

  app.get("/fornecedores/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const fornecedor = repository.buscarPorId(id);
    if (!fornecedor) return res.status(404).json({ erro: "Fornecedor nao encontrado" });
    res.json(fornecedor);
  });

  app.post("/fornecedores", (req, res) => {
    try {
      const { nome_empresa, cnpj, telefone, email, endereco, cidade, estado, cep } = req.body;

      if (!nome_empresa || nome_empresa.trim().length === 0) throw new Error("Nome da empresa e obrigatorio");
      if (!cnpj || cnpj.trim().length === 0) throw new Error("CNPJ e obrigatorio");
      if (!telefone || telefone.trim().length === 0) throw new Error("Telefone e obrigatorio");
      if (!email || !email.includes("@")) throw new Error("Email invalido");
      if (!endereco || endereco.trim().length === 0) throw new Error("Endereco e obrigatorio");
      if (!cidade || cidade.trim().length === 0) throw new Error("Cidade e obrigatoria");
      if (!estado || estado.trim().length === 0) throw new Error("Estado e obrigatorio");
      if (!cep || cep.trim().length === 0) throw new Error("Cep e obrigatorio");

      const fornecedor = repository.salvar({
        nome_empresa,
        cnpj,
        telefone,
        email,
        endereco,
        cidade,
        estado,
        cep,
      });
      res.status(201).json(fornecedor);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}