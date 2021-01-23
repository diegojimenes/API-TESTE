import express from 'express'
import Contas from './controllers/Contas'
const routes = express.Router();

routes.post('/contas', Contas.store)
routes.post('/listar-contas', Contas.index)
export default routes