import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://juandev:jNybrqTzSarHo78Z@programing-blog.jmggnul.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function connect () {
  try {
    await client.connect()
    const database = client.db('blog-express')
    return database.collection('users')
  } catch (err) {
    console.log(`500 server internal error ${err}`)
    await client.close()
  }
}

export class UserModal {
  async getAll ({ id }) {
    const db = await connect()
    if (id) {
      return db.find({
        _id: { id }
      }).toArray()
    }

    return db.find({}).toArray()
  }

  async getById ({ id }) {
    const db = await connect()
    const objectId = ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  async create ({ input }) {
    const db = await connect()
    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}
