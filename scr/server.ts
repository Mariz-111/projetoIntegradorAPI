import express from "express";
import clienteRoutes from "./controller/cliente";
import compraRoutes from "./controller/compra";
import cupomRoutes from "./controller/Cupom";  
import enderecoRoutes from "./controller/Endereco";
import formaPagamentoRoutes from "./controller/forma_de_pagamento";
import pedidoRoutes from "./controller/pedido";
import produtoRoutes from "./controller/produto";

const app = express();

app.use(express.json());

app.use(clienteRoutes);
app.use(compraRoutes);
app.use(cupomRoutes);
app.use(enderecoRoutes);
app.use(formaPagamentoRoutes);
app.use(pedidoRoutes);
app.use(produtoRoutes);

app.get("/", (req, res) => {
    res.json({ status: "API do projeto rodando perfeitamente!" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado com sucesso em http://localhost:${PORT}`);
});

export { app };
