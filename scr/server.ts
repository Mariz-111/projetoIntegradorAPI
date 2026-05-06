import express from "express";
import { ClienteControllers } from "./Controllers/ClienteController";
import { CompraControllers } from "./Controllers/CompraController";
import { EnderecoControllers } from "./Controllers/EnderecoController";
import { FormaDePagamentoControllers } from "./Controllers/FormaDePagamentoController";
import { PedidoControllers } from "./Controllers/PedidoController";
import { ProdutoControllers } from "./Controllers/ProdutoController";

const app = express();

app.use(express.json());

export { app };

ClienteControllers();
CompraControllers();
EnderecoControllers();
FormaDePagamentoControllers();
PedidoControllers();
ProdutoControllers();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});