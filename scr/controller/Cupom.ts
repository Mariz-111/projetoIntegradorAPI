import { Router, Request, Response } from "express";
import { CupomRepository } from "../repository/CupomRepository";

const router = Router();
const cupomRepo = new CupomRepository();

router.post("/cupons", (req: Request, res: Response) => {
    try {
        const { codigo, desconto, validade } = req.body;

        if (!codigo || !desconto || !validade) {
            res.status(400).json({ erro: "Todos os campos (codigo, desconto, validade) são obrigatórios!" });
            return;
        }

        const novoCupom = cupomRepo.salvar({ codigo, desconto, validade });
        res.status(201).json(novoCupom);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/cupons", (req: Request, res: Response) => {
    try {
        const cupons = cupomRepo.listar();
        res.json(cupons);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/cupons/:codigo", (req: Request, res: Response) => {
    try {
        const codigo = req.params.codigo as string;
        const cupom = cupomRepo.buscarPorCodigo(codigo);

        if (cupom) {
            res.json(cupom);
        } else {
            res.status(404).json({ erro: `Cupom '${codigo}' não encontrado ou inválido.` });
        }
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;