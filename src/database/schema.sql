PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cupom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT UNIQUE NOT NULL,
    desconto REAL NOT NULL, 
    validade TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS endereco (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    rua TEXT NOT NULL,
    numero TEXT NOT NULL,
    bairro TEXT NOT NULL,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    cep TEXT NOT NULL,
    complemento TEXT, 
    FOREIGN KEY (cliente_id) REFERENCES cliente (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS forma_pagamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipoPagamento TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    descricao TEXT NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0 
);

CREATE TABLE IF NOT EXISTS compra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    metodo_pagamento TEXT NOT NULL,
    status_pagamento TEXT NOT NULL DEFAULT 'Pendente',
    data_pagamento TEXT, 
    status_entrega TEXT NOT NULL DEFAULT 'Preparando',
    frete REAL NOT NULL DEFAULT 0.0,
    cupom_id INTEGER, 
    quantidade INTEGER NOT NULL,
    subtotal REAL NOT NULL,
    valor_total REAL NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente (id),
    FOREIGN KEY (produto_id) REFERENCES produto (id),
    FOREIGN KEY (cupom_id) REFERENCES cupom (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS pedido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    data_pedido TEXT NOT NULL,
    pagamento_id INTEGER NOT NULL,
    status_pedido TEXT NOT NULL,
    subtotal REAL NOT NULL,
    frete REAL NOT NULL,
    cupom_id INTEGER,
    FOREIGN KEY (cliente_id) REFERENCES cliente (id),
    FOREIGN KEY (pagamento_id) REFERENCES forma_pagamento (id),
    FOREIGN KEY (cupom_id) REFERENCES cupom (id) ON DELETE SET NULL
);