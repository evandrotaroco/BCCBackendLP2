import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados
    #codigo;
    #nome;
    #cnpj;
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

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
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
    constructor(codigo = 0, nome = "", cnpj = "", email = "", telefone = "", endereco = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cnpj = cnpj;
        this.#email = email;
        this.#telefone = telefone;
        this.#endereco = endereco;
    }

    // Override do método toJSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cnpj": this.#cnpj,
            "email": this.#email,
            "telefone": this.#telefone,
            "endereco": this.#endereco,
        };
    }

    // Métodos para camada de persistência
    async incluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.incluir(this);
    }

    async consultar(termo) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(termo);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async alterar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.alterar(this);
    }
}
