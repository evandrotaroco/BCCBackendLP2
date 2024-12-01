import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados
    #codigo;
    #nome;
    #cpf;
    #email;
    #telefone;
    #endereco;

    // Getters e Setters
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    // Construtor
    constructor(codigo = 0, nome = "", cpf = "", email = "", telefone = "", endereco = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#email = email;
        this.#telefone = telefone;
        this.#endereco = endereco;
    }

    // Override do método toJSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cpf": this.#cpf,
            "email": this.#email,
            "telefone": this.#telefone,
            "endereco": this.#endereco
        };
    }

    // Métodos para camada de persistência
    async incluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.incluir(this);
    }

    async consultar(termo) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(termo);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async alterar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
    }
}
