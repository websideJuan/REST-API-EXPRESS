import z from 'zod'
const userSchema = z.object({
  userNAme: z.string({
    invalid_type_error: 'userNAme must be a string',
    required_error: 'userNAme is requiered'
  }),
  password: z.number().int().positive(),
  emailUser: z.string(),
  image: z.string()
})

export function validateUsers (object) {
  return userSchema.safeParse(object)
}

export function validatePartialUsers (object) {
  return userSchema.partial().safeParse(object)
}
