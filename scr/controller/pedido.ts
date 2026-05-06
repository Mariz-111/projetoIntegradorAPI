import { Router, Request, Response } from "express";
import { PedidoRepository } from "../repository/PedidoRepository";

const router = Router();
const pedidoRepo = new PedidoRepository();

// 1. Criar Pedido (POST /pedidos)
router.post("/pedidos", (req: Request, res: Response) => {
    try {
        const { cliente_id, pagamento_id, status_pedido, subtotal, frete, cupom_id } = req.body;

        // Validação básica dos campos obrigatórios do Pedido
        if (!cliente_id || !pagamento_id || !status_pedido || subtotal === undefined || frete === undefined) {
            res.status(400).json({ 
                erro: "Os campos cliente_id, pagamento_id, status_pedido, subtotal e frete são obrigatórios!" 
            });
            return;
        }

        // Criamos o pedido definindo a data_pedido de forma automática com o horário atual
        const novoPedido = pedidoRepo.salvar({
            cliente_id,
            data_pedido: new Date().toISOString(), // Gera a data automaticamente (Ex: "2026-05-06T04:15:00.000Z")
            pagamento_id,
            status_pedido,
            subtotal,
            frete,
            cupom_id
        });

        res.status(201).json(novoPedido);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

// 2. Listar todos os Pedidos (GET /pedidos)
router.get("/pedidos", (req: Request, res: Response) => {
    try {
        const pedidos = pedidoRepo.listar();
        res.json(pedidos);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

// 3. Buscar Pedidos de um Cliente específico (GET /pedidos/cliente/:cliente_id)
router.get("/pedidos/cliente/:cliente_id", (req: Request, res: Response) => {
    try {
        const cliente_id = Number(req.params.cliente_id);

        if (isNaN(cliente_id)) {
            res.status(400).json({ erro: "ID do cliente inválido." });
            return;
        }

        const pedidos = pedidoRepo.buscarPorCliente(cliente_id);
        res.json(pedidos);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

// 4. Atualizar apenas o Status do Pedido (PATCH /pedidos/:id/status)
router.patch("/pedidos/:id/status", (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { status_pedido } = req.body; // Ex: "Pago", "Cancelado", "Enviado"

        if (isNaN(id) || !status_pedido) {
            res.status(400).json({ erro: "ID do pedido inválido ou 'status_pedido' não enviado." });
            return;
        }

        const sucesso = pedidoRepo.atualizarStatus(id, status_pedido);

        if (sucesso) {
            res.json({ mensagem: `Status do pedido ${id} atualizado para: ${status_pedido}` });
        } else {
            res.status(404).json({ erro: "Pedido não encontrado para atualizar." });
        }
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;