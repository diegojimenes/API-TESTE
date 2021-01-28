import moment from 'moment'
import Modal from '../componets/modal.js'
import axios from 'axios'
import { useState } from 'react'

const renderizarContas = (dados) => {
    return dados.map(({ nome, valorOriginal, dataDeVencimento, dataDePagamento, quantidadeDeDiasDeAtraso, valorCorrigido, multa, juros }) => {
        return <tr>
            <td>{nome}</td>
            <td>{moment(dataDeVencimento).format('DD/MM/YYYY')}</td>
            <td>{moment(dataDePagamento).format('DD/MM/YYYY')}</td>
            <td>{quantidadeDeDiasDeAtraso}</td>
            <td>{valorOriginal.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</td>
            <td>{valorCorrigido.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</td>
            <td>{multa.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</td>
            <td>{juros.toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}</td>
        </tr>
    })
}

const style = {
    input: {
        height: 35, width: 250, border: 'none', borderBottom: "1px solid #00A1D7", marginBottom: 10
    }
}

const Filtro = ({ setDataInicial, setDataFinal, callback, toogleModal, contas }) => {
    return <div className="filtro" style={{ display: 'flex', justifyContent: contas.length != 0 ? 'flex-start' : 'center', alignItems: 'center', margin: 25, marginLeft: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
            <label>Data Inicial</label>
            <input style={style.input} type="date" onChange={(e) => setDataInicial(e.target.value)} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Data Final</label>
            <input style={style.input} type="date" onChange={(e) => setDataFinal(e.target.value)} />
        </div>
        <button style={{ border: 'none', borderRadius: 35, cursor: 'pointer', height: 35, paddingLeft: 25, paddingRight: 25, marginLeft: 10, marginRight: 10, backgroundColor: "#00A1D7", color: '#fff' }} onClick={callback}>Filtrar Contas</button>
        {contas.length != 0 ?
            <button style={{ border: 'none', borderRadius: 35, cursor: 'pointer', height: 35, paddingLeft: 25, paddingRight: 25, backgroundColor: "#00A1D7", color: '#fff' }} onClick={() => toogleModal(true)}>Adicionar conta</button>
            : <></>
        }
    </div>
}

const Paginador = (paginacao, buscarContas, setPagina, setContas, { dataInicial, dataFinal }) => {
    const numeros = () => {
        let array = []
        for (var i = 1; i <= paginacao.total; i++) {
            array.push(i)
        }
        return array
    }
    let lista = numeros()
    let filtro = {}
    if (dataInicial != "" || dataFinal != "") filtro = { dataInicial, dataFinal }
    let buscar = (pagina) => buscarContas(setContas, filtro, (v) => setPagina(v), pagina)
    let styleButton = (index) => (paginacao.paginaAtual == index + 1) ? { backgroundColor: '#3B70A2' } : {}
    return <div className="paginador">
        <button onClick={() => buscar(paginacao.paginaAtual == 0 ? 0 : paginacao.paginaAtual - 1)}>{"<"}</button>
        {lista.map((numero, index) => {
            if (index <= 3) {
                return <button style={styleButton(index)} onClick={() => buscar(index + 1)}>{numero}</button>
            } else if (index == 4) {
                return <>
                    <button style={styleButton(index)} onClick={() => buscar(paginacao.paginaAtual == lista.length ? paginacao.paginaAtual : paginacao.paginaAtual + 1)}>...</button>
                    <button style={styleButton(index)} onClick={() => buscar(index + 1)}>{lista.length}</button>
                </>
            }
        })}
        <button onClick={() => buscar(paginacao.paginaAtual == lista.length ? paginacao.paginaAtual : paginacao.paginaAtual + 1)}>{">"}</button>
    </div>
}

const buscarContas = async (setContas, filtros, setPagina, pagina) => {
    let filtro = {}
    if (filtros != undefined) {
        console.log(filtros)
        filtro = {
            "dataInicial": filtros.dataInicial,
            "dataFinal": filtros.dataFinal
        }
    }
    if (pagina) filtro.page = pagina
    const resultado = await axios.post('http://localhost:3001/listar-contas', filtro)
    console.log('resultado', resultado)
    let paginaAtual = resultado.data.page
    let total = resultado.data.pages
    setPagina({ paginaAtual, total })
    setContas(resultado.data.docs)
}

const criarContas = async (setContas, args, setPagina) => {
    await axios.post('http://localhost:3001/cadastrar-conta', args)
    buscarContas(setContas, undefined, (v) => setPagina(v))
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
    const [paginacao, setPagina] = useState({ paginaAtual: 1, total: 1 })
    return <div style={{width: "100%"}}>
        <Modal showModal={showModal} onCancel={() => toogleModal(false)}
            callback={() => criarContas((v) => setContas(v), { nome, valorOriginal, dataDeVencimento, dataDePagamento }, (v) => setPagina(v))}
            props={{
                setNome: (v) => setNome(v),
                setVencimento: (v) => setVencimento(v),
                setValor: (v) => setValor(v),
                setPagamento: (v) => setPagamento(v)
            }} />
        {
            contas.length == 0 ?
                <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>Listar Contas</h1>
                    <Filtro toogleModal={(v) => toogleModal(v)} contas={contas} setDataInicial={(v) => setDataInicial(v)} setDataFinal={(v) => setDataFinal(v)} callback={() => buscarContas((v) => setContas(v), { dataInicial, dataFinal }, (v) => setPagina(v))} />
                </div>
                :
                <section className="container">
                    <h2>Lista de Contas</h2>
                    <Filtro toogleModal={(v) => toogleModal(v)} contas={contas} setDataInicial={(v) => setDataInicial(v)} setDataFinal={(v) => setDataFinal(v)} callback={() => buscarContas((v) => setContas(v), { dataInicial, dataFinal }, (v) => setPagina(v))} />
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
                    {Paginador(paginacao, buscarContas, (v) => setPagina(v), (v) => setContas(v), { dataInicial, dataFinal })}
                </section>
        }
    </div>
}