const style = {
    input: {
        height: 35, width: "100%", border: 'none', borderBottom: "1px solid #abf16c", marginBottom: 10
    },
    button: {
        borderRadius: 35,
        width: 100,
        height: 35,
        border: "none",
        cursor: "pointer",
        color: "#fff",
        marginLeft: 10,
    }
}

export default ({ showModal, onCancel, callback, props }) => {
    return showModal ? <div style={{ position: "absolute", top: 0, width: "100%", height: "100%", background: 'rgba(0,0,0,0.6)' }}>
        <form onSubmit={(e) => e.preventDefault()} style={{ width: "50%", marginLeft: "25%", marginTop: 200, borderRadius: 15, background: "#fff", display: "flex", flexDirection: "column", padding: 10, paddingLeft: 20, paddingRight: 20 }}>
            <h2>Criar nova conta</h2>
            <label>Nome</label>
            <input style={style.input} type="text" name="nome" placeholder="Nome" onChange={(e) => props.setNome(e.target.value)} required />
            <label>Valor</label>
            <input style={style.input} type="number" name="valorOriginal" placeholder="Valor original" onChange={(e) => props.setValor(e.target.value)} required />
            <label>Data Vencimento</label>
            <input style={style.input} type="date" onChange={(e) => props.setVencimento(e.target.value)} required />
            <label>Data pagamento</label>
            <input style={style.input} type="date" onChange={(e) => props.setPagamento(e.target.value)} required />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                <button style={{ ...style.button, backgroundColor: "#E53E34" }} onClick={(e) => { e.preventDefault(); onCancel() }}>Cancelar</button>
                <button style={{ ...style.button, backgroundColor: "#ABF16C" }} onClick={callback}>Salvar</button>
            </div>
        </form>
    </div> : <></>
}