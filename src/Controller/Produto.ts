import { Request, Response } from "express";
import { app } from "../server";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export function ProdutoControllers() {
    const repository = new ProdutoRepository();

    app.get("/produtos", (req: Request, res: Response) => {
        const { nome } = req.query;

        if (nome) {
            const produtosFiltrados = repository.buscarPorNome(String(nome));
            return res.json(produtosFiltrados);
        }

        return res.json(repository.listar());
    });

    app.get("/produtos/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const produto = repository.buscarPorId(id);
        
        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        return res.json(produto);
    });

    app.post("/produtos", (req: Request, res: Response) => {
        try {
            const { nome, preco, estoque, descricao } = req.body;

            if (!nome || nome.trim().length === 0) {return res.status(400).json({ erro: "Nome do produto é obrigatório" });}
            if (!preco || preco <= 0) {return res.status(400).json({ erro: "Preço deve ser maior que zero" });}

            const novoProduto = repository.salvar({ nome, preco, estoque: estoque, descricao });

            return res.status(201).json(novoProduto);
        } catch (err: any) {
            const mensagem = err instanceof Error ? err.message : "Erro interno";
            return res.status(400).json({ erro: mensagem });
        }
    });
}