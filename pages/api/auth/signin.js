import bcrypt from 'bcryptjs'
import getMongoClient from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!process.env.MONGODB_URI) {
    return res.status(503).json({ error: 'MongoDB is not configured. Add MONGODB_URI to the project root .env.local file, then restart the app.' })
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!email || !password || email.length > 254 || password.length > 128) {
    return res.status(400).json({ error: 'Enter your email and password.' })
  }

  try {
    const client = await getMongoClient()
    const database = client.db(process.env.MONGODB_DB || 'titus_ledger')
    const user = await database.collection('users').findOne({ email })

    if (!user || typeof user.passwordHash !== 'string' || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Email or password is incorrect.' })
    }

    return res.status(200).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        accountType: user.accountType || 'person',
        business: user.business || { name: '', email: user.email, address: '' },
      },
    })
  } catch (error) {
    console.error('Signin failed:', error)
    return res.status(500).json({ error: 'Could not sign in. Check the MongoDB connection and try again.' })
  }
}