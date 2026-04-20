import jwt from 'jsonwebtoken'
import AppError from '../error/AppError.js'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Token não fornecido.', 401))
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return next(new AppError('Token inválido ou expirado.', 401))
    }
}

export default authMiddleware