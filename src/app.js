import cors from 'cors'
import express from 'express'
import clienteRouter from './routers/clienteRouter.js'
import authRouter from './routers/authRouter.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

const start = () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/auth', authRouter)
    app.use('/cliente', clienteRouter)

    app.use(errorMiddleware)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, (err) => err ? console.error(err) : console.log(`Server Running PORT=${PORT}`))
}

export default start
