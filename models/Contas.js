import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const conta = new mongoose.Schema({
    nome: { type: String, required: false },
    valorOriginal: { type: String, required: false },
    dataDeVencimento: { type: String, required: false },
    dataDePagamento: { type: String, required: false },
})

conta.plugin(mongoosePaginate);

mongoose.model('conta', conta);
