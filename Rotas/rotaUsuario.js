import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

const usuCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", usuCtrl.gravar);
rotaUsuario.put("/:nome", usuCtrl.editar);
rotaUsuario.patch("/:nome", usuCtrl.editar);
rotaUsuario.delete("/:nome", usuCtrl.excluir);
rotaUsuario.get("/:nome", usuCtrl.consultar);
rotaUsuario.get("/", usuCtrl.consultar);
rotaUsuario.post("/login", usuCtrl.login);

export default rotaUsuario;
