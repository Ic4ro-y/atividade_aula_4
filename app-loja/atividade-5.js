const { Client } = require('pg');
require('dotenv').config();

function validarCliente(nome, email, telefone) {
  const erros = [];

  if (!nome || nome.length < 3) erros.push('Nome inválido');
  if (!email || !email.includes('@')) erros.push('Email inválido');
  if (telefone && telefone.length < 10) erros.push('Telefone inválido');

  return erros;
}

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

async function adicionarCliente(nome, email, telefone) {
  const erros = validarCliente(nome, email, telefone);
  if (erros.length > 0) {
    console.error('❌ Erros:');
    erros.forEach(e => console.error('-', e));
    return;
  }

  try {
    await client.connect();
    const res = await client.query(
      'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3)',
      [nome, email, telefone]
    );
    console.log('✅ Cliente válido inserido');
  } catch (erro) {
    console.error('❌ Erro:', erro.message);
  } finally {
    await client.end();
  }
}

adicionarCliente('João', 'joao@email.com', '11999999999');
