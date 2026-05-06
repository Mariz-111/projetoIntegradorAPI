import { Router, Request, Response } from "express";
import { ClienteRepository } from "../repository/ClienteRepository";

const router = Router();
const clienteRepo = new ClienteRepository();

// Cadastrar Cliente (POST /clientes)
router.post("/clientes", (req: Request, res: Response) => {
    try {
        const novoCliente = clienteRepo.salvar(req.body);
        res.status(201).json(novoCliente);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
});

// Listar Clientes (GET /clientes)
router.get("/clientes", (req: Request, res: Response) => {
    try {
        const clientes = clienteRepo.listar();
        res.json(clientes);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;