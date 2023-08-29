import { UserModal } from '../models/user.js'
import { validatePartialUsers, validateUsers } from '../schemas/users.js'

export class UserController {
  static async getAll (req, res) {
    const { id } = req.query
    const result = await new UserModal().getAll({ id })
    res.status(200).json(result)
  }

  static async getById (req, res) {
    const { id } = req.params

    const result = await new UserModal().getById({ id })
    if (result) return res.json(result)

    res.status(404).json({ message: 'User not found ' })
  }

  static async cretae (req, res) {
    console.log(req.body)
    const result = validateUsers(req.body)
    const newUser = await new UserModal().create({ input: result.data })

    res.json(newUser)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await new UserModal().delete({ id })

    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(201).json({ message: 'User delete' })
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialUsers(req.body)
    console.log(result.data)
    const updateUser = await new UserModal().update({ id, input: result.data })

    if (updateUser === false) return res.status(404).json({ message: 'User not editing' })

    res.status(200).json(updateUser)
  }
}
