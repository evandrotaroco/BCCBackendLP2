import { Router } from "express";
import UsuarioCtrl from "../Controle/usuarioCtrl";

const usuarioCtrl = new UsuarioCtrl();
const rota = Router();

rota
.get("/", usuarioCtrl.consultar)
.get("/:termo", usuarioCtrl.consultar)
.post("/login", usuarioCtrl.login)
.post("/", usuarioCtrl.gravar)
.put("/", usuarioCtrl.atualizar)
.patch("/", usuarioCtrl.atualizar)
.delete("/", usuarioCtrl.excluir);

export default rota;