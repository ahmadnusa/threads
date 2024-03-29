import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import ThreadCard from '@/components/cards/ThreadCard'
import Pagination from '@/components/shared/Pagination'
import { fetchPosts } from '@/lib/actions/thread.action'
import { fetchUser } from '@/lib/actions/user.action'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const user = await currentUser()
  if (user) {
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')
  }

  const result = await fetchPosts(1, 30)

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result?.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map(post => {
              const key = Math.floor(Math.random() * 1000)
              return (
                <ThreadCard
                  key={key}
                  id={post._id}
                  currentUserId={user?.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              )
            })}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  )
}
