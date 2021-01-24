import conta from '../models/Contas.js'
import Regras from '../models/Regras.js'
import moment from 'moment'

const buscarRegras = async () => {
    try {
        const regras = await Regras.find({ nome: { $regex: '.*multas.*' } })
        return regras
    } catch (err) {
        return {}
    }
}

const calcularMulta = (valor, dias, regras) => {
    let chave = dias <= 3 ? '-3' : dias >= 3 ? '+3' : '+5'
    let regra = regras[chave]
    let multa = valor * regra.multa
    let juros = (valor * regra.juros) * dias
    return {
        valor: valor + multa + juros,
        multa,
        juros
    }
}

const montarNota = (dados) => buscarRegras().then((regras) => {
    let conta = dados
    let dataDeVencimento = moment(dados.dataDeVencimento)
    let dataDePagamento = moment(dados.dataDePagamento)
    let quantidadeDeDiasDeAtraso = dataDePagamento.diff(dataDeVencimento, 'days')
    let calculoDaMulta = calcularMulta(dados.valorOriginal, quantidadeDeDiasDeAtraso, regras[0].regra)
    let valorCorrigido = calculoDaMulta.valor
    return {
        ...conta,
        dataDePagamento: dataDePagamento.format('YYYY-MM-DD'),
        quantidadeDeDiasDeAtraso,
        valorCorrigido,
        multa: calculoDaMulta.multa,
        juros: calculoDaMulta.juros
    }
})

export default {
    async index(req, res) {
        const { page = 1 } = req.query
        const { dataDeVencimento } = req.body
        const contas = await conta.paginate({ dataDeVencimento: dataDeVencimento }, { page, limit: 20, sort: { data: 'desc' } })
        return res.json(contas)
    },
    async store(req, res) {
        try {
            return montarNota(req.body).then((dados) => {
                // const retorno = await conta.create(dados);
                return res.json(dados)
            })
        } catch (err) {
            return res.json(err)
        }
    }
}