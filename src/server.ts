import express from "express";
import { ClienteControllers } from "./Controller/Cliente";
import { CompraControllers } from "./Controller/Compra";
import { EnderecoControllers } from "./Controller/Endereco";
import { FormaPagamentoControllers } from "./Controller/formapagamento";
import { PedidoControllers } from "./Controller/Pedido";
import { ProdutoControllers } from "./Controller/Produto";

const app = express();

app.use(express.json());

export { app };

ClienteControllers();
CompraControllers();
EnderecoControllers();
FormaPagamentoControllers();
PedidoControllers();
ProdutoControllers();

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});