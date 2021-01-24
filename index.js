import express from 'express'
import mongoose from 'mongoose'
import routes from './routes.js'

const app = express()
app.use(express.json())
const port = 3000
const host = "0.0.0.0"
const idContainer = 'e0d671f20e76'
mongoose.connect(
    `mongodb://diego:senha@${idContainer}:27017/APITESTE?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log('conectado no mongo com sucesso')
}).catch(() => {
    console.log('não consegui conectar')
})

app.use('/', (req, res, next) => {
    console.log('chamada recebida')
    next()
}, routes)

app.listen(port, host, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
