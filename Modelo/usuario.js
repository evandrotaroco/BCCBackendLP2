import UsuarioDAO from "../Persistencia/produtoDAO.js";

export default class Usuario {
    #nome; #email; #senha; #senhaConfirmada; #privilegio;
    constructor(nome="",email="",senha="",senhaConfirmada="",privilegio=""){
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#senhaConfirmada = senhaConfirmada;
        this.#privilegio = privilegio;
    }

    get nome() {return this.#nome;}
    get email() {return this.#email;}
    get senha() {return this.#senha;}
    get senhaConfirmada() {return this.#senha;}
    get privilegio() {return this.#privilegio;}
    
    set nome(novoNome) {this.#nome = novoNome;}
    set email(novoEmail) {this.#email = novoEmail;}
    set senha(novaSenha) {this.#senha = novaSenha;}
    set senhaConfirmada(novaSenhaConfirmada) {this.#senhaConfirmada = novaSenhaConfirmada;}
    set privilegio(novoPrivilegio) {this.#privilegio = novoPrivilegio;}

    async gravar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.gravar(this);
    }

    async editar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.editar(this);
    }

    async excluir(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
    }

    async consultar(termo){
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(termo);
    }

    async login(termo) {
        const usuDAO = new UsuarioDAO();
        return await usuDAO.login(termo);
    }
}