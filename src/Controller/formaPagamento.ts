import { Request, Response } from "express";
import { app } from "../server";
import { FormaPagamentoRepository } from "../repository/formaPagamentoRepository";

export function FormaPagamentoControllers() {
    const repository = new FormaPagamentoRepository();

    app.get("/formas-pagamento", (req: Request, res: Response) => {
        const { tipoPagamento } = req.query;

        if (tipoPagamento) {
            const formas = repository.buscarPorTipoPagamento(tipoPagamento as string);
            return res.json(formas);
        }

        res.json(repository.listar());
    });

    app.get("/formas-pagamento/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const forma = repository.buscarPorId(id);
        
        if (!forma) return res.status(404).json({ erro: "Forma de pagamento não encontrada" });
        res.json(forma);
    });

    app.post("/formas-pagamento", (req: Request, res: Response) => {
        try {
            const { tipoPagamento } = req.body;

            if (!tipoPagamento || tipoPagamento.trim().length === 0) {throw new Error("Tipo de pagamento é obrigatório");}

            const novaForma = repository.salvar({ tipoPagamento });

            res.status(201).json(novaForma);
        } catch (err: any) {
            res.status(400).json({ erro: err.message || "Erro interno" });
        }
    });
}