import { Request, Response } from "express";
import { app } from "../server";
import { FormaPagamentoRepository } from "../repository/FormaPagamentoRepository";

export function FormaPagamentoControllers() {
    const repository = new FormaPagamentoRepository();

    app.get("/formas-pagamento", (req: Request, res: Response) => {
        const { tipoPagamento } = req.query;

        if (tipoPagamento) {
            const formasFiltradas = repository.buscarPorTipo(tipoPagamento as string);
            return res.json(formasFiltradas);
        }

        res.json(repository.listar());
    });

    app.get("/formas-pagamento/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const formaPagamento = repository.buscarPorId(id);
        
        if (!formaPagamento) {
            return res.status(404).json({ erro: "Forma de pagamento não encontrada" });
        }
        res.json(formaPagamento);
    });

    app.post("/formas-pagamento", (req: Request, res: Response) => {
        try {
            const { tipoPagamento } = req.body;

            if (!tipoPagamento || tipoPagamento.trim().length === 0) {
                throw new Error("Tipo de pagamento é obrigatório");
            }

            const novaForma = repository.salvar({
                tipoPagamento
            });

            res.status(201).json(novaForma);
        } catch (err: any) {
            const mensagem = err instanceof Error ? err.message : "Erro interno";
            res.status(400).json({ erro: mensagem });
        }
    });
}