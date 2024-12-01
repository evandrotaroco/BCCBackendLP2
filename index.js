//instalar um módulo que oferece recursos p/ desenvolver um servidor http
//npm install express

//importar o módulo para ser utilizado em nossa aplicação
//const express = require('express'); commonJS
//vamos utilizar o padrão modular para importar os módulos
//não esqueça de atualizar o arquivo package.json adicionando a chave "type":"module"
import express from 'express';
import rotaProduto from './Rotas/rotaProdutos.js';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaFornecedor from './Rotas/rotaFornecedor.js';
import rotaUsuario from './Rotas/rotaUsuario.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const host = "0.0.0.0"; //todas as placas de rede do computador que está executando a aplicação
const porta = 3000;

const app = express(); //aplicação completa HTTP
//prepara a aplicação para processar dados no formato JSON
app.use(express.json());

//configurar a aplicação para responder requisições não importando a origem
app.use(cors({
                "origin":"*",
                "Access-Control-Allow-Origin":'*'
        }));

//app utilize a pasta 'publico' para disponibilizar o conteúdo ali armazenado
app.use(express.static('./publico'));


app.use('/produtos', rotaProduto);
app.use("/categorias",rotaCategoria);
app.use('/clientes',rotaCliente);
app.use('/fornecedores', rotaFornecedor);
app.use('/usuarios', rotaUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});
