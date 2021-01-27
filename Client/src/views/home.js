import moment from 'moment'
import Modal from '../componets/modal.js'
const contas = [
    {
        "nome": "conta de luz",
        "valorOriginal": 1200,
        "dataDeVencimento": "2021-01-21",
        "dataDePagamento": "2021-01-24",
        "quantidadeDeDiasDeAtraso": 3,
        "valorCorrigido": 1800,
        "multa": 240,
        "juros": 360
    },
    {
        "nome": "conta de luz",
        "valorOriginal": 1200,
        "dataDeVencimento": "2021-01-21",
        "dataDePagamento": "2021-01-24",
        "quantidadeDeDiasDeAtraso": 3,
        "valorCorrigido": 1800,
        "multa": 240,
        "juros": 360
    },
    {
        "nome": "conta de luz",
        "valorOriginal": 1200,
        "dataDeVencimento": "2021-01-21",
        "dataDePagamento": "2021-01-24",
        "quantidadeDeDiasDeAtraso": 3,
        "valorCorrigido": 1800,
        "multa": 240,
        "juros": 360
    }
]

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

const Filtro = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>
        <input style={{ height: 35, width: 250, border: 'none' }} type="date" />
        <button style={{ border: 'none', cursor: 'pointer', height: 35, paddingLeft: 25, paddingRight: 25 }}>Filtrar</button>
    </div>
}

export default () => {
    return <>
        <Modal />
        <section className="container">
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-end' }}>
                <button style={{ border: 'none', cursor: 'pointer', height: 35, paddingLeft: 25, paddingRight: 25 }}>Adicionar conta</button>
            </div>
            <h2 style={{ textAlign: 'center' }}>Lista de Contas</h2>
            <Filtro />
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