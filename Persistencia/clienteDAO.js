// DAO para Cliente
import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS cliente (
                cli_codigo INT NOT NULL AUTO_INCREMENT,
                cli_nome VARCHAR(100) NOT NULL,
                cli_email VARCHAR(100) NOT NULL UNIQUE,
                cli_telefone VARCHAR(15),
                cli_cpf VARCHAR(14) NOT NULL UNIQUE,
                cli_endereco VARCHAR(200),
                CONSTRAINT pk_cliente PRIMARY KEY (cli_codigo)
            );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.error("Erro ao iniciar a tabela Cliente: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
            INSERT INTO cliente (cli_nome, cli_email, cli_telefone, cli_cpf, cli_endereco) 
            VALUES (?, ?, ?, ?, ?);
            `;
            const parametros = [
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.cpf,
                cliente.endereco
            ];
            const resultado = await conexao.execute(sql, parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
            UPDATE cliente SET 
                cli_nome = ?, 
                cli_email = ?, 
                cli_telefone = ?, 
                cli_cpf = ?, 
                cli_endereco = ?
            WHERE cli_codigo = ?;
            `;
            const parametros = [
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.cpf,
                cliente.endereco,
                cliente.codigo
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = `SELECT * FROM cliente`;
        let parametros = [];

        if (!isNaN(parseInt(termo))) {
            sql += " WHERE cli_codigo = ?";
            parametros = [termo];
        } else if (termo) {
            sql += " WHERE cli_nome LIKE ?";
            parametros = [`%${termo}%`];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha["cli_codigo"],
                linha["cli_nome"],
                linha["cli_email"],
                linha["cli_telefone"],
                linha["cli_cpf"],
                linha["cli_endereco"]
            );
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cli_codigo = ?;`;
            const parametros = [cliente.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}
