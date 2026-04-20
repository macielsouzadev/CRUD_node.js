import AppError from '../error/AppError.js'

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ erro: err.message })
    }

    console.error('Erro inesperado:', err)
    return res.status(500).json({ erro: 'Erro interno no servidor.' })
}

export default errorMiddleware