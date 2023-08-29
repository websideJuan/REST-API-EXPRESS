import express from 'express'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import { moviesRouter } from './routes/movies.js'
import { usersRouter } from './routes/users.js'
const app = express()

app.use(corsMiddleware())
app.use(express.json())
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['Content-Type'] !== 'application/json') return next()

//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', async () => {
//     const data = JSON.parse(body)
//     data.timestand = Date.now()
//     req.body = data
//     next()
//   })
// })

app.disable('x-powered-by')

app.use('/movies', moviesRouter)
app.use('/users', usersRouter)

// app.patch('/users/:id')

app.use((req, res) => {
  res.status(404).send('404 not found')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Escuchando en el http://localhost:${PORT}`)
})
