CREATE TABLE  IF NOT EXISTS Cliente(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(100) UNIQUE,
  numero VARCHAR(20) UNIQUE
);

CREATE TABLEIF NOT EXISTS area_do_usuario(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  localizacao VARCHAR(100),
  nome VARCHAR(200),
  numero_de_telefone VARCHAR(20),
  cep CHAR(9),
  rua_avenida VARCHAR(100),
  numero_de_casa INT,
  FOREIGN KEY (cliente_id) REFERENCES Cliente(id)
);

CREATE TABLE IF NOT EXISTS categoria(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100) NOT NULL UNIQUE cHECK (length(nome) > 0),
  descricao VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS  produtos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(500) NOT NULL,
  valor DECIMAL(6,2) NOT NULL,
  tamanho VARCHAR(2),
  categoria_id INTEGER NOT NULL,
  cor VARCHAR(100),
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE IF NOT EXISTS  usuario_adm (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha CHAR(8) NOT NULL,
  estoque_id INTEGER,
  estoque_relatorio_id INTEGER
);

CREATE TABLE IF NOT EXISTS  estoque(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER,
  usuario_adm_id INTEGER,
  quantidade_estoque INT,
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  FOREIGN KEY (usuario_adm_id) REFERENCES usuario_adm(id)
);

CREATE TABLE IF NOT EXISTS estoque_relatorio(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER,
  usuario_adm_id INTEGER,
  entrada_de_mercadoria DATE,
  saida_para_troca DATE,
  saida_venda DATE,
  registro_movimentacao VARCHAR(500),
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  FOREIGN KEY (usuario_adm_id) REFERENCES usuario_adm(id)
);

CREATE TABLE forma_de_pagamento(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo_de_pagamento VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS status_pedido (
  id INTEGER PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL
    CHECK (codigo IN ('pendente', 'pago', 'separação', 'enviado', 'entregue', 'cancelado'))
);

CREATE TABLE IF NOT EXISTS pedidos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  pagamento_id INTEGER,
  subtotal DECIMAL(6,2),
  frete DECIMAL(6,2),
  status_id INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
  FOREIGN KEY (pagamento_id) REFERENCES forma_de_pagamento(id),
  FOREIGN KEY (status_id) REFERENCES status_pedido(id)
);

CREATE TABLE IF NOT EXISTS itens_pedido(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id INTEGER,
  produto_id INTEGER,
  quantidade INT,
  preco REAL CHECK (preco >=10),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS filtro_de_cor(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER,
  cor VARCHAR(50),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS fornecedor(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_empresa VARCHAR(100),
  cnpj VARCHAR(18),
  telefone VARCHAR(12),
  email VARCHAR(100),
  endereco VARCHAR(200),
  cidade VARCHAR(100),
  estado VARCHAR(50),
  cep VARCHAR(9)
);