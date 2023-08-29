import z from 'zod'
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is requiered'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Trhiller',
      'Sci-Fi',
      'Crime'
    ])
  )
})

export function validateMovies (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovies (object) {
  return movieSchema.partial().safeParse(object)
}
