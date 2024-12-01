import Usuario from "../Modelo/usuario.js";

export default class UsuarioCtrl{
    gravar(req, res) 
    {
        res.type("application/json");
        if (req.method == 'POST' && req.is("application/json"))
        {
            const nome = req.body.nome;
            const email = req.body.email;
            const senha = req.body.senha;
            const senhaConfirmada = req.body.senhaConfirmada;
            const privilegio = req.body.privilegio;
            if (nome &&
                email &&
                senha &&
                senhaConfirmada &&
                privilegio)
            {
                const usuario = new Usuario(nome, email, senha, senhaConfirmada, privilegio);
                usuario.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Usuario adicionado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao incluir usuario: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: informações invalidas!"
                });
            }
        } 
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é POST"
            });
        }
    }
    
    excluir(req, res)
    {
        res.type("application/json");
        if (req.method == 'DELETE')
        {
            const nome = req.body.nome;
            if (nome)
            {
                const usuario = new Usuario(nome);
                usuario.excluir()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Usuario excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao excluir usuario: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: informações invalidas!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é DELETE"
            });
        }
    }
    
    editar(req, res)
    {
        res.type("application/json");
        if ((req.method == 'PUT' || req.method == 'PATCH') && req.is("application/json")){
            const nome = req.body.nome;
            const senha = req.body.senha;
            const senhaConfirmada = req.body.senhaConfirmada;
            const privilegio = req.body.privilegio;

            if (nome &&
                senha &&
                senhaConfirmada &&
                privilegio)
            {
                const usuario = new Usuario(nome, "", senha, senhaConfirmada, privilegio);
                usuario.editar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Usuario atualizado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao atualizar o usuario: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: informações invalidas!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é PUT ou PATCH"
            });
        }    
    }
    
    consultar(req, res)
    {
        res.type("application/json");
        if (req.method=="GET")
        {
            const termo = req.params.termo;
            const usuario = new Usuario();
            usuario.consultar(termo)
            .then((resp) =>{
                res.status(200).json(resp);
            })
            .catch((erro) => {
                res.status(500).json({
                    "status":false,
                    "mensagem":"Erro ao consultar usuario: " + erro.message    
                });
            });
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é GET"
            });
        }    
    }

    login(req, res)
    {
        res.type("application/json");
        if (req.method=="POST")
        {
            const {nome, senha} = req.body;
            if(nome, senha){
                const usuario = new Usuario(nome, "", senha);
                usuario.login(nome)
                .then((resp) =>{
                    if(resp && resp.senha == senha){
                        res.status(200).json({
                            "status":true,
                            "privilegio": resp.privilegio
                        });
                    }
                    else{
                        res.status(400).json({
                            "status":false,
                            "mensagem":"Usuario ou senha Incorretos!"    
                        });
                    }
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao logar usuario: " + erro.message    
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Consulta Invalida!, credencias vazias!"    
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é POST"
            });
        }    
    }
}