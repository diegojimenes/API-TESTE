import moment from 'moment'
import Modal from '../componets/modal.js'
import axios from 'axios'
import { useState, useEffect } from 'react'
// const contas = [
//     {
//         "nome": "conta de luz",
//         "valorOriginal": 1200,
//         "dataDeVencimento": "2021-01-21",
//         "dataDePagamento": "2021-01-24",
//         "quantidadeDeDiasDeAtraso": 3,
//         "valorCorrigido": 1800,
//         "multa": 240,
//         "juros": 360
//     },
//     {
//         "nome": "conta de luz",
//         "valorOriginal": 1200,
//         "dataDeVencimento": "2021-01-21",
//         "dataDePagamento": "2021-01-24",
//         "quantidadeDeDiasDeAtraso": 3,
//         "valorCorrigido": 1800,
//         "multa": 240,
//         "juros": 360
//     },
//     {
//         "nome": "conta de luz",
//         "valorOriginal": 1200,
//         "dataDeVencimento": "2021-01-21",
//         "dataDePagamento": "2021-01-24",
//         "quantidadeDeDiasDeAtraso": 3,
//         "valorCorrigido": 1800,
//         "multa": 240,
//         "juros": 360
//     }
// ]

const renderizarContas = (dados) => {
    return dados.map(({ nome, valorOriginal, dataDeVencimento, dataDePagamento, quantidadeDeDiasDeAtraso, valorCorrigido, multa, juros }) => {
        return <tr>
            <td>{nome}</td>
            <td>{moment(dataDeVencimento).format('DD/MM/YYYY')}</td>
            <td>{moment(dataDePagamento).format('DD/MM/YYYY')}</td>
            <th>{quantidadeDeDiasDeAtraso}</th>
            <th>{valorOriginal.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</th>
            <th>{valorCorrigido.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</th>
            <th>{multa.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</th>
            <th>{juros.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</th>
        </tr>
    })
}

const Filtro = ({ setDataInicial, setDataFinal, callback }) => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>
        <input style={{ height: 35, width: 250, border: 'none' }} type="date" onChange={(e) => setDataInicial(e.target.value)} />
        <input style={{ height: 35, width: 250, border: 'none' }} type="date" onChange={(e) => setDataFinal(e.target.value)} />
        <button style={{ border: 'none', cursor: 'pointer', height: 35, paddingLeft: 25, paddingRight: 25 }} onClick={callback}>Filtrar</button>
    </div>
}

const buscarContas = async (setContas, args) => {
    const filtro = {}
    if (args) {
        filtro = {
            "dataDeVencimento": args.dataInicial
        }
    }
    const resultado = await axios.post('http://api-teste_back:3001/listar-contas', filtro)
    setContas(resultado)
}

const criarContas = async (setContas, args) => {
    await axios.post('http://api-teste_back:3001/cadastrar-conta', args)
    buscarContas(setContas)
}

export default () => {
    const [showModal, toogleModal] = useState(false)
    const [dataInicial, setDataInicial] = useState('')
    const [dataFinal, setDataFinal] = useState('')
    const [contas, setContas] = useState([])
    const [nome, setNome] = useState('')
    const [valorOriginal, setValor] = useState(0)
    const [dataDeVencimento, setVencimento] = useState('')
    const [dataDePagamento, setPagamento] = useState('')
    useEffect(() => {
        buscarContas((v) => setContas(v))
    }, [])
    return <>
        <Modal showModal={showModal} onCancel={() => toogleModal(false)}
            callback={() => criarContas((v) => setContas(v), { nome, valorOriginal, dataDeVencimento, dataDePagamento })}
            props={{
                setNome: (v) => setNome(v),
                setVencimento: (v) => setVencimento(v),
                setValor: (v) => setValor(v),
                setPagamento: (v) => setPagamento(v)
            }} />
        <section className="container">
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-end' }}>
                <button style={{ border: 'none', cursor: 'pointer', height: 35, paddingLeft: 25, paddingRight: 25 }} onClick={() => toogleModal(true)}>Adicionar conta</button>
            </div>
            <h2 style={{ textAlign: 'center' }}>Lista de Contas</h2>
            <Filtro setDataInicial={(v) => setDataInicial(v)} setDataFinal={(v) => setDataFinal(v)} callback={() => buscarContas((v) => setContas(v), { dataInicial, dataFinal })} />
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Vencimento</th>
                    <th>Data do pagamento</th>
                    <th>Dias em atraso</th>
                    <th>Valor</th>
                    <th>Valor corrigido</th>
                    <th>Multa</th>
                    <th>Juros</th>
                </tr>
                {renderizarContas(contas)}
            </table>
        </section>
    </>
}