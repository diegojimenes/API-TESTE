import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const conta = new mongoose.Schema({
    nome: { type: String, required: true },
    valorOriginal: { type: Number, required: true },
    valorCorrigido: { type: Number, required: true },
    dataDeVencimento: { type: String, required: true },
    dataDePagamento: { type: String, required: true },
    quantidadeDeDiasDeAtraso: { type: Number, required: true },
    multa: { type: Number, required: true },
    juros: { type: Number, required: true }
})

conta.plugin(mongoosePaginate);

export default mongoose.model('conta', conta);
