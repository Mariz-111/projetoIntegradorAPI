import { Router, Request, Response } from "express";
import { CompraRepository } from "../repository/compra";
import { ProdutoRepository } from "../repository/ProdutoRepository";

const router = Router();
const compraRepo = new CompraRepository();
const produtoRepo = new ProdutoRepository();

router.post("/compras", (req: Request, res: Response) => {
    try {
        const { cliente_id, metodo_pagamento, frete, cupom_id, quantidade } = req.body;

        const produtoIdUnico = 1; 
        const produto = produtoRepo.buscarPorId(produtoIdUnico);

        if (!produto) {
             res.status(404).json({ erro: "Produto único não encontrado para realizar a venda." });
             return;
        }

        if (produto.estoque < quantidade) {
             res.status(400).json({ 
                erro: `Estoque insuficiente! Temos apenas ${produto.estoque} unidades disponíveis.` 
            });
             return;
        }

        const subtotal = produto.preco * quantidade;

        const valor_total = subtotal + Number(frete);

        const novaCompra = compraRepo.salvar({
            cliente_id,
            produto_id: produtoIdUnico,
            metodo_pagamento,
            status_pagamento: "Pendente", 
            data_pagamento: null,         
            status_entrega: "Preparando",  
            frete,
            cupom_id,
            quantidade,
            subtotal,
            valor_total
        });

        produtoRepo.baixarEstoque(produtoIdUnico, quantidade);

        res.status(201).json({
            mensagem: "Compra realizada e estoque atualizado com sucesso!",
            compra: novaCompra
        });

    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/compras", (req: Request, res: Response) => {
    try {
        const compras = compraRepo.listar();
        res.json(compras);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.patch("/compras/:id/entrega", (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status_entrega } = req.body;

        const sucesso = compraRepo.atualizarEntrega(Number(id), status_entrega);

        if (sucesso) {
            res.json({ mensagem: `Status de entrega atualizado para: ${status_entrega}` });
        } else {
            res.status(404).json({ erro: "Compra não encontrada." });
        }
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;