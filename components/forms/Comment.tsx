'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { addCommentToThread } from '@/lib/actions/thread.action'
import { commentSchema } from '@/lib/validations/thread'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props {
  threadId: string
  currentUserImg: string
  currentUserId: string
}

export default function Comment({ threadId, currentUserImg, currentUserId }: Props) {
  const pathname = usePathname()

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      thread: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)

    form.reset()
  }

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  )
}
