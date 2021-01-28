import express from 'express'
import Contas from './controllers/ContasController.js'
import Regras from './controllers/RegrasController.js'
const routes = express.Router();

routes.post('/cadastrar-conta', Contas.store)
routes.post('/listar-contas', Contas.index)
routes.post('/cadastrar-Regra', Regras.store)
routes.post('/listar-Regras', Regras.index)
export default routes