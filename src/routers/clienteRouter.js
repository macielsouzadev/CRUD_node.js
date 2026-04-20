import { Router } from 'express'
import clienteController from '../controllers/clienteController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', clienteController.buscar)
router.get('/:id', clienteController.buscarId)
router.post('/', clienteController.insert)
router.put('/:id', clienteController.update)
router.delete('/:id', clienteController.delete)

export default router
