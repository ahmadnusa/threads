'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { deleteThread } from '@/lib/actions/thread.action'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface Props {
  threadId: string
  currentUserId?: string
  authorId: string
  parentId: string | null
  isComment?: boolean
}

function DeleteThread({ threadId, currentUserId, authorId, parentId, isComment }: Props) {
  const pathname = usePathname()
  const { push } = useRouter()

  if (currentUserId !== authorId || pathname === '/') return null

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Image
          src="/assets/delete.svg"
          alt="delte"
          width={18}
          height={18}
          className="cursor-pointer object-contain"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-dark-4 border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-light-2 mb-4">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-slate-500 border-none hover:bg-slate-400">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-red-600 hover:bg-red-500"
              onClick={async () => {
                await deleteThread(JSON.parse(threadId), pathname)
                if (!parentId || !isComment) {
                  push('/')
                }
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteThread
