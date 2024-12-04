import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

const usuCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", usuCtrl.gravar);
rotaUsuario.put("/:codigo", usuCtrl.editar);
rotaUsuario.patch("/:codigo", usuCtrl.editar);
rotaUsuario.delete("/:codigo", usuCtrl.excluir);
rotaUsuario.get("/:codigo", usuCtrl.consultar);
rotaUsuario.get("/", usuCtrl.consultar);
rotaUsuario.post("/login", usuCtrl.login);

export default rotaUsuario;
