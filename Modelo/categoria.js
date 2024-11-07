import CategoriaDAO from "../Persistencia/CategoriaDAO.js";
export default class Categoria{
    #codigo;
    #descricao;

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo=novoCodigo;
    } 

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    constructor(codigo=0, descricao=""){
        this.#codigo=codigo;
        this.#descricao=descricao;           
    }

    toJSON(){
        return {
            "codigo":this.#codigo,
            "descricao":this.#descricao
        }
    }

    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async editar(){
        const catDAO = new CategoriaDAO();
        await catDAO.editar(this);
    }

    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async consultar(termo){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(termo);
    }
}
