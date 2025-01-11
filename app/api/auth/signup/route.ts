import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const client = await clientPromise
    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

