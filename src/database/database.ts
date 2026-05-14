import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve(__dirname, "../../database.db");
const schemaPath = path.resolve(__dirname, "./schema.sql");
const db = new Database(dbPath);

const schema = fs.readFileSync(schemaPath, "utf-8");
db.exec(schema);

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS cliente(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  telefone VARCHAR(13),
  cpf TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS produto(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  preco DECIMAL(10,2),
  estoque INTEGER(100),
  descricao TEXT
  );

  CREATE TABLE IF NOT EXISTS cupom (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo VARCHAR(20) UNIQUE,
  desconto DECIMAL(5,2),
  validade TEXT
  );

  CREATE TABLE IF NOT EXISTS formaPagamento(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipoPagamento VARCHAR(20)
  );

  CREATE TABLE IF NOT EXISTS pedido(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  data_pedido TEXT,
  pagamento_id INTEGER,
  status_pedido INTEGER,
  subtotal DECIMAL(6,2),
  frete DECIMAL(6,2),
  FOREIGN KEY (status_id) REFERENCES status_pedido(id),
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (pagamento_id) REFERENCES forma_de_pagamento(id)
  );

  CREATE TABLE IF NOT EXISTS endereco(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  rua TEXT NOT NULL,
  numero VARCHAR(10),
  bairro TEXT,
  cidade TEXT,
  estado VARCHAR(2),
  cep VARCHAR(10),
  complemento TEXT,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id)
  );

CREATE TABLE IF NOT EXISTS compra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  produto_id INTEGER,
  metodo_pagamento VARCHAR(20),
  status_pagamento VARCHAR(30),
  data_pagamento DATE,
  status_entrega VARCHAR(40),
  frete DECIMAL(10,2),
  cupom_id INTEGER,
  quantidade INTEGER,
  valor_total DECIMAL(10,2),
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (produto_id) REFERENCES produto(id),
  FOREIGN KEY (cupom_id) REFERENCES cupom(id)
);
`);


export default db;
