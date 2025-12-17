const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

async function exibirDados() {
  try {
    await client.connect();

    const clientes = await client.query('SELECT * FROM clientes');
    const produtos = await client.query('SELECT * FROM produtos');

    console.log('\n📋 CLIENTES');
    clientes.rows.forEach(c =>
      console.log(`${c.id} - ${c.nome} | ${c.email}`)
    );

    console.log('\n📦 PRODUTOS');
    produtos.rows.forEach(p =>
      console.log(`${p.id} - ${p.nome} | R$ ${p.preco}`)
    );

  } catch (erro) {
    console.error('❌ Erro:', erro.message);
  } finally {
    await client.end();
  }
}

exibirDados();
