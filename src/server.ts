import express from "express";
import { Cliente } from "./controller/Cliente";
import { Compra } from "./controller/Compra";
import { Endereco } from "./controller/Endereco";
import { FormaPagamento } from "./Controller/formaPagamento";
import { Pedido } from "./controller/Pedido";
import { Produto } from "./controller/Produto";

const app = express();

app.use(express.json());

export { app };

Cliente();
Compra();
Endereco();
FormaPagamento();
Pedido();
Produto();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});