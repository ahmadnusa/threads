/* eslint-disable @typescript-eslint/no-explicit-any */
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
  } catch (error: any) {
    throw new Error(`Failed to update User: ${error.message}`)
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDb()
    const user = await User.findOne({ id: userId })
    // .populate({
    //   path: 'communities' /*, model: Community*/,
    // })
    return JSON.parse(JSON.stringify(user))
  } catch (error: any) {
    throw new Error(`Failed to fetch user : ${error.message}`)
  }
}
