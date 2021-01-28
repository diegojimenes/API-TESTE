import Regras from '../../models/Regras.js'
import moment from 'moment'

const buscarRegras = async (regras) => {
    try {
        const regra = await regras.find({ nome: { $regex: '.*multas.*' } })
        return regra
    } catch (err) {
        return [{}]
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

export default (dados, regrasDefault = Regras) => buscarRegras(regrasDefault).then((regras) => {
    try {
        let conta = dados
        let dataDeVencimento = moment(dados.dataDeVencimento)
        let dataDePagamento = moment(dados.dataDePagamento)
        let quantidadeDeDiasDeAtraso = dataDePagamento.diff(dataDeVencimento, 'days')
        let calculoDaMulta = calcularMulta(parseFloat(dados.valorOriginal), quantidadeDeDiasDeAtraso, regras[0].regra)
        let valorCorrigido = calculoDaMulta.valor
        return {
            ...conta,
            dataDePagamento: dataDePagamento.format('YYYY-MM-DD'),
            quantidadeDeDiasDeAtraso,
            valorCorrigido,
            multa: calculoDaMulta.multa,
            juros: calculoDaMulta.juros
        }
    } catch (err) {
        return err
    }
})