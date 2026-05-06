import { Router, Request, Response } from "express";
import { ProdutoRepository } from "../repository/ProdutoRepository";

const router = Router();
const produtoRepo = new ProdutoRepository();

router.post("/produtos", (req: Request, res: Response) => {
    try {
        const { nome, preco, descricao, estoque } = req.body;

        if (!nome || preco === undefined || !descricao || estoque === undefined) {
            res.status(400).json({ 
                erro: "Todos os campos (nome, preco, descricao, estoque) são obrigatórios!" 
            });
            return;
        }

        const novoProduto = produtoRepo.salvar({
            nome,
            preco: Number(preco),
            descricao,
            estoque: Number(estoque)
        });

        res.status(201).json(novoProduto);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/produtos", (req: Request, res: Response) => {
    try {
        const produtos = produtoRepo.listar();
        res.json(produtos);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/produtos/:id", (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ erro: "ID do produto inválido." });
            return;
        }

        const produto = produtoRepo.buscarPorId(id);

        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ erro: "Produto não encontrado." });
        }
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.put("/produtos", (req: Request, res: Response) => {
    try {
        const { id, nome, preco, descricao, estoque } = req.body;

        if (!id || !nome || preco === undefined || !descricao || estoque === undefined) {
            res.status(400).json({ 
                erro: "ID do produto e todos os campos atualizados são obrigatórios!" 
            });
            return;
        }

        const sucesso = produtoRepo.atualizar({
            id: Number(id),
            nome,
            preco: Number(preco),
            descricao,
            estoque: Number(estoque)
        });

        if (sucesso) {
            res.json({ mensagem: "Produto atualizado com sucesso!" });
        } else {
            res.status(404).json({ erro: "Produto não encontrado para atualizar." });
        }
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;