import { Router } from 'express'
import { UserController } from '../controller/users.js'

export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', UserController.cretae)

usersRouter.delete('/:id', UserController.delete)

usersRouter.patch('/:id', UserController.update)
