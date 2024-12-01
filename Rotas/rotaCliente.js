import { Router } from "express"; //micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";

const clieCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", clieCtrl.gravar);
rotaCliente.put("/:codigo", clieCtrl.editar);
rotaCliente.patch("/:codigo", clieCtrl.editar);
rotaCliente.delete("/:codigo", clieCtrl.excluir);
rotaCliente.get("/:codigo", clieCtrl.consultar);
rotaCliente.get("/",clieCtrl.consultar);

export default rotaCliente;
