import { Request, Response } from "express";
import { app } from "../server";
import { EnderecoRepository } from "../repository/EnderecoRepository";

export function EnderecoControllers() {
    const repository = new EnderecoRepository();

    app.get("/enderecos", (req: Request, res: Response) => {
        const { cliente_id } = req.query;

        if (cliente_id) {
            const enderecosCliente = repository.buscarPorClienteId(Number(cliente_id));
            return res.json(enderecosCliente);
        }

        res.json(repository.listar());
    });

    app.get("/enderecos/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const endereco = repository.buscarPorId(id);
        
        if (!endereco) return res.status(404).json({ erro: "Endereço não encontrado" });
        res.json(endereco);
    });

    app.post("/enderecos", (req: Request, res: Response) => {
        try {
            const {
                cliente_id, rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

            if (!cliente_id) throw new Error("ID do cliente é obrigatório");
            if (!rua || rua.trim().length === 0) throw new Error("Rua é obrigatória");
            if (!numero || numero.trim().length === 0) throw new Error("Número é obrigatório");

            const endereco = repository.salvar({
                cliente_id, rua, numero, bairro, cidade, estado, cep, complemento
            });

            res.status(201).json(endereco);
        } catch (err: any) {
            const mensagem = err instanceof Error ? err.message : "Erro interno";
            res.status(400).json({ erro: mensagem });
        }
    });
}