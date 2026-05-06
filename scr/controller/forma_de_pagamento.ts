import { Router, Request, Response } from "express";
import { FormaPagamentoRepository } from "../repository/formaPagamentoRepository";

const router = Router();
const formaPagamentoRepo = new FormaPagamentoRepository();

router.post("/formas-pagamento", (req: Request, res: Response) => {
    try {
        const { tipoPagamento } = req.body;

        if (!tipoPagamento) {
            res.status(400).json({ erro: "O campo 'tipoPagamento' é obrigatório!" });
            return;
        }

        const novaForma = formaPagamentoRepo.salvar({
            tipoPagamento
        });

        res.status(201).json(novaForma);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/formas-pagamento", (req: Request, res: Response) => {
    try {
        const formas = formaPagamentoRepo.listar();
        res.json(formas);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;