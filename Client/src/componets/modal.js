const style = {
    input: {
        height: 35, width: "100%", border: 'none'
    }
}

export default ({ showModal, onCancel, callback, props }) => {
    return showModal ? <div style={{ position: "absolute", top: 0, width: "100%", height: "100%", background: 'rgba(0,0,0,0.6)' }}>
        <div style={{ width: "50%", marginLeft: "25%", marginTop: 200, background: "#fff", display: "flex", flexDirection: "column", padding: 10 }}>
            <h2>Criar nova conta</h2>
            <input style={style.input} type="text" name="nome" placeholder="Nome" onChange={(e) => props.setNome(e.target.value)}/>
            <input style={style.input} type="number" name="valorOriginal" placeholder="Valor original" onChange={(e) => props.setVencimento(e.target.value)}/>
            <input style={style.input} type="date" onChange={(e) => props.setValor(e.target.value)}/>
            <input style={style.input} type="date" onChange={(e) => props.setPagamento(e.target.value)}/>
            <div>
                <button style={{ width: "50%", height: 35, border: "none", cursor: "pointer" }} onClick={onCancel}>Cancelar</button>
                <button style={{ width: "50%", height: 35, border: "none", cursor: "pointer" }} onClick={callback}>Salvar</button>
            </div>
        </div>
    </div> : <></>
}