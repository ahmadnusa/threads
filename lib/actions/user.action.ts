'use server'

import { FilterQuery, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'

import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import { connectToDb } from '../mongoose'

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}): Promise<void> {
  try {
    await connectToDb()

    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true },
    )

    if (path === '/profile/edit') revalidatePath(path)
  } catch (error) {
    console.error('Failed to update User: ', error)
    throw error
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectToDb()
    const user = await User.findOne({ id: userId }).populate({
      path: 'communities',
      model: Community,
    })
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.error('Failed to fetch user : ', error)
    throw error
  }
}

export default async function fetchUserPosts(userId: string) {
  try {
    await connectToDb()

    const thraeds = await User.findOne({ id: userId }).populate({
      path: 'threads',
      model: Thread,
      populate: [
        {
          path: 'community',
          model: Community,
          select: 'name id image _id', // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'name image id',
          },
        },
      ],
    })

    return thraeds
  } catch (error) {
    console.error('Error fetching user threads:', error)
    throw error
  }
}

export async function fetchUsers({
  userId,
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc',
}: {
  userId: string
  searchString?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: SortOrder
}) {
  try {
    await connectToDb()

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, 'i')

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = { id: { $ne: userId } }

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== '') {
      query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }]
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy }

    const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize)

    const totalUsersCount = await User.countDocuments(query)

    const users = await usersQuery.exec()

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length

    return { users, isNext }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export async function getActivity(userId: string) {
  try {
    await connectToDb()

    const userThreads = await Thread.find({ author: userId })

    const childThraedIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children)
    }, [])

    const replies = await Thread.find({
      _id: { $in: childThraedIds },
      author: { $ne: userId },
    }).populate({
      path: 'author',
      model: User,
      select: 'name image _id',
    })

    return replies
  } catch (error) {
    console.error('Error fetching replies:', error)
    throw error
  }
}
