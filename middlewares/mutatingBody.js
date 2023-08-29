export const mutatingBody = (req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', async () => {
    const data = JSON.parse(body)
    data.timestand = Date.now()
    req.body = data
    next()
  })
}
