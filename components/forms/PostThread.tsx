'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createThread } from '@/lib/actions/thread.action'
import { threadSchema } from '@/lib/validations/thread'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

export default function PostThread({ userId }: { userId: string }) {
  const { push } = useRouter()
  const pathname = usePathname()

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  })

  const onSubmit = async (values: z.infer<typeof threadSchema>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,
    })

    push('/')
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-4 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Write here"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500 hover:bg-primary-500/80">
          Post Thread
        </Button>
      </form>
    </Form>
  )
}
