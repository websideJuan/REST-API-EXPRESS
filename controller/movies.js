import { MovieModel } from '../models/movie.js'
import { validateMovies, validatePartialMovies } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById(id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    console.log(req.body)
    const resutl = validateMovies(req.body)
    console.log(resutl)
    if (resutl.error) {
      return res.status(400).json({ error: resutl.error.message })
    }

    const newMovie = await MovieModel({ input: resutl.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static async patch (req, res) {
    const resutl = validatePartialMovies(req.body)

    if (!resutl.success) {
      return res.status(400).json({ error: resutl.error.message })
    }
    const { id } = req.params

    const updateMovie = await MovieModel({ id, input: resutl.data })

    if (resutl === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json(updateMovie)
  }
}
