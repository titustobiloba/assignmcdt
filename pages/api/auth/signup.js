import bcrypt from 'bcryptjs'
import { MongoServerError } from 'mongodb'
import getMongoClient from '../../../lib/mongodb'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!process.env.MONGODB_URI) {
    return res.status(503).json({ error: 'MongoDB is not configured. Add MONGODB_URI to the project root .env.local file, then restart the app.' })
  }

  const { name, email, password, businessName, businessEmail, businessAddress } = req.body || {}
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const normalizedName = typeof name === 'string' ? name.trim() : ''
  const normalizedBusinessName = typeof businessName === 'string' ? businessName.trim() : ''
  const normalizedBusinessEmail = typeof businessEmail === 'string' && businessEmail.trim()
    ? businessEmail.trim().toLowerCase()
    : normalizedEmail
  const normalizedBusinessAddress = typeof businessAddress === 'string' ? businessAddress.trim() : ''

  if (!normalizedName || normalizedName.length > 100) {
    return res.status(400).json({ error: 'Enter your name (up to 100 characters).' })
  }
  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return res.status(400).json({ error: 'Password must be between 8 and 128 characters.' })
  }
  if (!normalizedBusinessName || normalizedBusinessName.length > 150) {
    return res.status(400).json({ error: 'Enter a business or project name (up to 150 characters).' })
  }
  if (!emailPattern.test(normalizedBusinessEmail) || normalizedBusinessEmail.length > 254) {
    return res.status(400).json({ error: 'Enter a valid business email address.' })
  }
  if (normalizedBusinessAddress.length > 500) {
    return res.status(400).json({ error: 'Business address is too long.' })
  }

  try {
    const client = await getMongoClient()
    const database = client.db(process.env.MONGODB_DB || 'titus_ledger')
    const users = database.collection('users')
    await users.createIndex({ email: 1 }, { unique: true })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = {
      name: normalizedName,
      email: normalizedEmail,
      passwordHash,
      accountType: 'person',
      business: {
        name: normalizedBusinessName,
        email: normalizedBusinessEmail,
        address: normalizedBusinessAddress,
      },
      createdAt: new Date(),
    }

    const result = await users.insertOne(user)
    return res.status(201).json({
      user: {
        id: result.insertedId.toString(),
        name: user.name,
        email: user.email,
        accountType: user.accountType,
        business: user.business,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }

    console.error('Signup failed:', error)
    return res.status(500).json({ error: 'Could not create your account. Check the MongoDB credentials and Atlas network access.' })
  }
}