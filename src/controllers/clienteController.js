import clienteService from '../services/clienteService.js'
import AppError from '../error/AppError.js'

class clienteController {
    async buscar(req, res, next) {
        try {
            const resp = await clienteService.buscar()
            res.status(200).json({
                clientes: resp,
                msg: 'Operação bem sucedida.'
            })
        } catch (err) {
            next(err)
        }
    }

    async buscarId(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (!id || isNaN(id) || id <= 0) {
                return next(new AppError('ID inválido.', 400))
            }

            const resp = await clienteService.buscarId(id)
            if (!resp) return next(new AppError('Cliente não encontrado.', 404))

            res.status(200).json({
                cliente: resp,
                msg: 'Operação bem sucedida.'
            })
        } catch (err) {
            next(err)
        }
    }

    async insert(req, res, next) {
        try {
            const { nome, profissao } = req.body

            if (!nome || nome.trim() === '') {
                return next(new AppError("O campo 'nome' é obrigatório.", 400))
            }
            if (!profissao || profissao.trim() === '') {
                return next(new AppError("O campo 'profissao' é obrigatório.", 400))
            }

            const resp = await clienteService.insert(nome.trim(), profissao.trim())
            res.status(201).json({
                cliente: resp,
                msg: 'Cliente inserido com sucesso.'
            })
        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (!id || isNaN(id) || id <= 0) {
                return next(new AppError('ID inválido.', 400))
            }

            const { nome, profissao } = req.body

            if (!nome || typeof nome !== 'string' || nome.trim() === '') {
                return next(new AppError("O campo 'nome' é obrigatório e deve ser uma string válida.", 400))
            }

            if (profissao !== undefined && (typeof profissao !== 'string' || profissao.trim() === '')) {
                return next(new AppError("O campo 'profissao' deve ser uma string válida.", 400))
            }

            const resp = await clienteService.update(id, nome.trim(), profissao?.trim())
            if (!resp) return next(new AppError('Cliente não encontrado.', 404))

            return res.status(200).json({
                cliente: resp,
                msg: 'Cliente atualizado com sucesso.'
            })
        } catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (!id || isNaN(id) || id <= 0) {
                return next(new AppError('ID inválido.', 400))
            }

            const resp = await clienteService.delete(id)
            if (!resp) return next(new AppError('Cliente não encontrado.', 404))

            res.status(200).json({
                cliente: resp,
                msg: 'Cliente deletado com sucesso.'
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new clienteController()
