import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const requireJson = (jsonPaht) => require(jsonPaht)
