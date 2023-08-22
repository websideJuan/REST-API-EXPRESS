const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const movies = require('./movies.json')
const { validateMovies, validatePartialMovies } = require('./schemas/movies.js')

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCPTED_ORIGINS = [
      'http://localhost:5500'
    ]

    if (ACCPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  // const origin = req.header('origin')
  // if (ACCPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { genre } = req.query
  if (genre) {
    const filterMovie = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filterMovie)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  // const origin = req.header('origin')
  // if (ACCPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { id } = req.params
  const movie = movies.find(libro => libro.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const resutl = validateMovies(req.body)

  if (resutl.error) {
    return res.status(400).json({ error: resutl.error.message })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...resutl.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const resutl = validatePartialMovies(req.body)

  if (!resutl.success) {
    return res.status(400).json({ error: resutl.error.message })
  }

  const { id } = req.params

  const indexMovie = movies.findIndex(movie => movie.id === id)

  if (movies[indexMovie] === -1) {
    return res.status(404).json({ message: '404 movie not found' })
  }

  const updateMovie = {
    ...movies[indexMovie],
    ...resutl.data
  }

  movies[indexMovie] = updateMovie
  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const indexMovie = movies.findIndex(movie => movie.id === id)

  if (indexMovie === -1) {
    return res.status(404).json({ message: 'Muvie not found' })
  }

  movies.splice(indexMovie, 1)

  return res.json({ message: 'Movie deleted' })
})

app.use((req, res) => {
  res.status(404).send('404 not found')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Escuchando en el http://localhost:${PORT}`)
})
