// DAO para Fornecedor
import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor (
                forn_codigo INT NOT NULL AUTO_INCREMENT,
                forn_nome VARCHAR(100) NOT NULL,
                forn_cnpj VARCHAR(18) NOT NULL UNIQUE,
                forn_email VARCHAR(100) NOT NULL,
                forn_telefone VARCHAR(15),
                forn_endereco VARCHAR(200),
                CONSTRAINT pk_fornecedor PRIMARY KEY (forn_codigo)
            );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.error("Erro ao iniciar a tabela Fornecedor: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
            INSERT INTO fornecedor (forn_nome, forn_cnpj, forn_email, forn_telefone, forn_endereco) 
            VALUES (?, ?, ?, ?, ?);
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.email,
                fornecedor.telefone,
                fornecedor.endereco
            ];
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
            UPDATE fornecedor SET 
                forn_nome = ?, 
                forn_cnpj = ?, 
                forn_email = ?,
                forn_telefone = ?,
                forn_endereco = ?
            WHERE forn_codigo = ?;
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.email,
                fornecedor.telefone,
                fornecedor.endereco,
                fornecedor.codigo
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = `SELECT * FROM fornecedor`;
        let parametros = [];

        if (!isNaN(parseInt(termo))) {
            sql += " WHERE forn_codigo = ?";
            parametros = [termo];
        } else if (termo) {
            sql += " WHERE forn_nome LIKE ?";
            parametros = [`%${termo}%`];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha["forn_codigo"],
                linha["forn_nome"],
                linha["forn_cnpj"],
                linha["forn_email"],
                linha["forn_telefone"],
                linha["forn_endereco"]
            );
            listaFornecedores.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE forn_codigo = ?;`;
            const parametros = [fornecedor.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}
