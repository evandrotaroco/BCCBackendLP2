import conectar from "./Conexao.js"
import Usuario from "../Modelo/usuario.js"

export default class UsuarioDAO{
    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario (
                    nome VARCHAR(100) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    senha VARCHAR(50) NOT NULL,
                    senhaConfirmada VARCHAR(50) NOT NULL,
                    privilegio VARCHAR(9) NOT NULL,
                    CONSTRAINT pk_usuario PRIMARY KEY(nome, email),
                    CONSTRAINT uk_nome UNIQUE (nome),
                    CONSTRAINT uk_email UNIQUE (email)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `
                INSERT INTO usuario(nome, email, senha, senhaConfirmada, privilegio)
                values(?,?,?,?,?)
            `;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.senhaConfirmada,
                usuario.privilegio
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE nome = ?`;
            let parametros = [usuario.nome];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async editar(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `UPDATE usuario SET senha=?, senhaConfirmada=?, privilegio=?
                WHERE nome = ?
            `;
            let parametros = [
                usuario.senha,
                usuario.senhaConfirmada,
                usuario.privilegio,
                usuario.nome
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        let sql = "SELECT * FROM usuario";
        let parametros = [];
        if(termo){
            sql = ` WHERE nome = ?`;
            parametros = [termo];
        }
        const [dataBase, campos] = await conexao.execute(sql,parametros);
        await conexao.release();
        return dataBase;
    }

    async login(termo){
        const conexao = await conectar();
        const sql = `SELECT senha, privilegio FROM usuario WHERE nome = ?`;
        const parametros = [termo];
        const [dataBase, campos] = await conexao.execute(sql,parametros);
        await conexao.release();
        return dataBase ? dataBase[0] : null;
    }
}