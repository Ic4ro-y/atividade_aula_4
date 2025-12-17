const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

async function adicionarProdutos() {
  try {
    await client.connect();

    const produtos = [
      ['Notebook Dell', 3500, 5],
      ['Mouse Logitech', 80, 25],
      ['Teclado Mecânico', 350, 10],
      ['Monitor LG 24"', 800, 8]
    ];

    for (const p of produtos) {
      await client.query(
        'INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3)',
        p
      );
    }

    console.log('✅ Produtos adicionados');
  } catch (erro) {
    console.error('❌ Erro:', erro.message);
  } finally {
    await client.end();
  }
}

adicionarProdutos();
