import { requireJson } from '../utils/requireJson.js'
import { randomUUID } from 'node:crypto'

const movies = requireJson('../movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies
  }

  static getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create (input) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const indexMovie = movies.findIndex(movie => movie.id === id)
    if (indexMovie === -1) return false
    movies.splice(indexMovie, 1)
    return true
  }

  static async update ({ id, input }) {
    const indexMovie = movies.findIndex(movie => movie.id === id)

    if (movies[indexMovie] === -1) return false

    const updateMovie = {
      ...movies[indexMovie],
      ...input
    }

    movies[indexMovie] = updateMovie
  }
}
