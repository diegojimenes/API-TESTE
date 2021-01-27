import conta from '../models/Contas.js'
import montarNota from './metodos/calculosParaContas.js'

export default {
    async index(req, res) {
        const { page = 1 } = req.query
        const { dataDeVencimento } = req.body
        let filter = {}
        if (req.body.dataDeVencimento) {
            filter = { dataDeVencimento }
        }
        const contas = await conta.paginate(filter, { page, limit: 20, sort: { data: 'desc' } })
        return res.json(contas)
    },
    async store(req, res) {
        try {
            return montarNota(req.body).then(async (dados) => {
                console.log(dados)
                try {
                    await conta.create(dados);
                    return res.json(dados)
                } catch (err) {
                    res.json(err)
                }
            })
        } catch (err) {
            return res.json(err)
        }
    }
}