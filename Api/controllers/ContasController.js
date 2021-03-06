import conta from '../models/Contas.js'
import montarNota from './metodos/calculosParaContas.js'
import moment from 'moment'

export default {
    async index(req, res) {
        const { dataInicial, dataFinal, page = 1 } = req.body
        let filter = {}
        if (req.body.dataInicial && req.body.dataFinal) {
            filter = { dataDeVencimento: { $gte: moment(dataInicial).format('YYYY-MM-DD'), $lte: moment(dataFinal).format('YYYY-MM-DD') } }
        }
        console.log(filter)
        const contas = await conta.paginate(filter, { page, limit: 10, sort: { data: 'desc' } })
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