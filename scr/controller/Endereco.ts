import { app } from "../server";
import { EnderecoRepository } from "../Repositories/Endereco";

export function EnderecoControllers() {
  const repository = new EnderecoRepository();

  app.get("/enderecos", (req, res) => {
    const { cliente_id } = req.query;

    if (cliente_id) {
      const enderecosCliente = repository.buscarPorCliente(parseInt(cliente_id as string));
      return res.json(enderecosCliente);
    }

    res.json(repository.listar());
  });

  app.get("/enderecos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const endereco = repository.buscarPorId(id);
    if (!endereco) return res.status(404).json({ erro: "Endereço não encontrado" });
    res.json(endereco);
  });

  app.post("/enderecos", (req, res) => {
    try {
      const {
        cliente_id,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        complemento
      } = req.body;

      if (!cliente_id) throw new Error("ID do cliente é obrigatório");
      if (!rua || rua.trim().length === 0) {
        throw new Error("Rua é obrigatória");
      }
      if (!numero || numero.trim().length === 0) {
        throw new Error("Número é obrigatório");
      }

      const endereco = repository.salvar({
        cliente_id,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        complemento
      });

      res.status(201).json(endereco);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}