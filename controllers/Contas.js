import mongoose from 'mongoose'
const conta = mongoose.model('conta')

export default {
    async index(req, res) {
        const { page = 1 } = req.query
        const { dataDeVencimento } = req.body
        const contas = await conta.paginate({ dataDeVencimento: dataDeVencimento }, { page, limit: 20, sort: { data: 'desc' } })
        return res.json(contas)
    },
    async store(req, res) {
        const retorno = await conta.create(req.body);
        return res.json(retorno)
    }
}