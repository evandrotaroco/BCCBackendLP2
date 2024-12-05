import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const { nome, cnpj, email, telefone, endereco } = requisicao.body;

            if (nome && cnpj && email) {
                const fornecedor = new Fornecedor(0, nome, cnpj, email, telefone, endereco);

                fornecedor
                    .incluir()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Fornecedor adicionado com sucesso!",
                            codigo: fornecedor.codigo,
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao incluir fornecedor: " + erro.message,
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados obrigatórios conforme a documentação da API.",
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo;
            const { nome, cnpj, email, telefone, endereco } = requisicao.body;

            if (codigo > 0 && nome && cnpj && email) {
                const fornecedor = new Fornecedor(codigo, nome, cnpj, email, telefone, endereco);

                fornecedor
                    .alterar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Fornecedor alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao alterar fornecedor: " + erro.message,
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados obrigatórios conforme a documentação da API.",
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "DELETE") {
            const codigo = requisicao.params.codigo;

            if (codigo > 0) {
                const fornecedor = new Fornecedor(codigo);

                fornecedor
                    .excluir()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Fornecedor excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao excluir fornecedor: " + erro.message,
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe um código válido conforme a documentação da API.",
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const codigo = requisicao.params.codigo || "";

            const fornecedor = new Fornecedor();
            fornecedor
                .consultar(codigo)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar fornecedores: " + erro.message,
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }
}
