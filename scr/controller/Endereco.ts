import { Router, Request, Response } from "express";
import { EnderecoRepository } from "../repository/EnderecoRepository";

const router = Router();
const enderecoRepo = new EnderecoRepository();

router.post("/enderecos", (req: Request, res: Response) => {
    try {
        const { cliente_id, rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

        if (!cliente_id || !rua || !numero || !bairro || !cidade || !estado || !cep) {
            res.status(400).json({ erro: "Todos os campos (exceto complemento) são obrigatórios!" });
            return;
        }

        const novoEndereco = enderecoRepo.salvar({
            cliente_id,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            cep,
            complemento
        });

        res.status(201).json(novoEndereco);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});


router.get("/enderecos/cliente/:cliente_id", (req: Request, res: Response) => {
    try {
        const cliente_id = Number(req.params.cliente_id);

        if (isNaN(cliente_id)) {
            res.status(400).json({ erro: "ID do cliente inválido." });
            return;
        }

        const endereco = enderecoRepo.buscarPorClienteId(cliente_id);

        if (endereco) {
            res.json(endereco);
        } else {
            res.status(404).json({ erro: "Nenhum endereço cadastrado para este cliente." });
        }
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.put("/enderecos", (req: Request, res: Response) => {
    try {
        const { id, cliente_id, rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

        if (!id || !cliente_id) {
            res.status(400).json({ erro: "ID do endereço e ID do cliente são necessários para atualizar." });
            return;
        }

        const sucesso = enderecoRepo.atualizar({
            id,
            cliente_id,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            cep,
            complemento
        });

        if (sucesso) {
            res.json({ mensagem: "Endereço atualizado com sucesso!" });
        } else {
            res.status(404).json({ erro: "Endereço não encontrado ou dados não alterados." });
        }
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;