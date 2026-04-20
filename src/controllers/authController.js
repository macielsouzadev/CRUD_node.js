import jwt from 'jsonwebtoken'
import AppError from '../error/AppError.js'

class authController {
    async login(req, res, next) {
        try {
            const { usuario, senha } = req.body

            if (!usuario || !senha) {
                return next(new AppError('Usuário e senha são obrigatórios.', 400))
            }

            if (
                usuario !== process.env.AUTH_USER ||
                senha !== process.env.AUTH_PASS
            ) {
                return next(new AppError('Credenciais inválidas.', 401))
            }

            const token = jwt.sign(
                { usuario },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            )

            return res.status(200).json({
                token,
                msg: 'Login realizado com sucesso.'
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new authController()
