import express from 'express'
import mongoose from 'mongoose'
import routes from './routes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const port = 3001
const host = "0.0.0.0"
const idContainer = '9cc359fb406b'
mongoose.connect(
    `mongodb://diego:senha@db:27017/APITESTE?authSource=admin`,
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
