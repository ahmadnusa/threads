'use server'

import { revalidatePath } from 'next/cache'

import User from '../models/user.model'
import { connectToDb } from '../mongoose'

interface params {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: params): Promise<void> {
  try {
    await connectToDb()

    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true },
    )

    if (path === '/profile/edit') revalidatePath(path)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Failed to update User: ${error.message}`)
  }
}
