import * as z from 'zod'

export const threadSchema = z.object({
  thread: z.string().min(3, {
    message: 'thread must be at least 3 characters.',
  }),
  accountId: z.string(),
})
export const commentSchema = z.object({
  thread: z.string().min(3, {
    message: 'thread must be at least 3 characters.',
  }),
})
