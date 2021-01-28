import Regras from '../models/Regras.js'

export default {
    async index(req, res) {
        let filter = {}
        if (req.body.search) {
            filter = { nome: { $regex: '.*' + req.body.search + '.*' } }
        }
        try {
            const regras = await Regras.find(filter)
            return res.json(regras)
        } catch (err) {
            return res.json(err)
        }
    },
    async store(req, res) {
        try {
            const retorno = await Regras.create(req.body);
            return res.json(retorno)
        } catch (err) {
            return res.json(err)
        }
    }
}