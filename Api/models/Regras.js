import mongoose from 'mongoose'

const Regras = new mongoose.Schema({
    nome: { type: String, required: true },
    regra: { type: Object, required: true }
}, { strict: false })

export default mongoose.model('regras', Regras);