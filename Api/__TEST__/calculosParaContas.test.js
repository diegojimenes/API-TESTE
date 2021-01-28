import montarNota from '../controllers/metodos/calculosParaContas'

describe('testando calculos de juros e multas', () => {
    const regras = {
        find: () => new Promise((res) => {
            return res([{
                "_id": "x",
                "nome": "multas/juros",
                "regra": {
                    "-3": {
                        "multa": 0.2,
                        "juros": 0.1
                    },
                    "+3": {
                        "multa": 0.3,
                        "juros": 0.2
                    },
                    "+5": {
                        "multa": 0.5,
                        "juros": 0.3
                    }
                },
                "__v": 0
            }])
        })
    }
    const dadosDeEntrada = {
        "nome": "conta de luz",
        "valorOriginal": 100,
        "dataDeVencimento": "2021-01-21",
        "dataDePagamento": "2021-01-24"
    }
    const dadosDeSaida = {
        "nome": "conta de luz",
        "valorOriginal": 100,
        "dataDeVencimento": "2021-01-21",
        "dataDePagamento": "2021-01-24",
        "quantidadeDeDiasDeAtraso": 3,
        "valorCorrigido": 150,
        "multa": 20,
        "juros": 30
    }
    it('testando com valores esperados', () => {
        montarNota(dadosDeEntrada, regras).then((dados) => {
            expect(dados).toEqual(dadosDeSaida)
        })
    })
})