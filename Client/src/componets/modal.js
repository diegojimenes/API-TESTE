// {
// 	"nome": "conta de luz",
// 	"valorOriginal": 1200,
// 	"dataDeVencimento": "2021-01-21",
// 	"dataDePagamento": "2021-01-24"
// }

export default () => {
    return <div style={{ position: "absolute", top: 0, width: "100%", height: "100%", background: 'rgba(0,0,0,0.6)' }}>
        <div style={{ width: "50%", marginLeft: "25%", marginTop: 200, background: "#fff", display: "flex", flexDirection: "column" }}>
            <h2>Criar nova conta</h2>
            <input type="text" name="nome" placeholder="Nome" />
            <input type="number" name="valorOriginal" placeholder="Valor original" />
            <input style={{ height: 35, width: 250, border: 'none' }} type="date" />
            <input style={{ height: 35, width: 250, border: 'none' }} type="date" />
            <button>Salvar</button>
        </div>
    </div>
}