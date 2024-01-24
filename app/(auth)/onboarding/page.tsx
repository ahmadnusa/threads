import { currentUser } from '@clerk/nextjs'

import AccountProfile from '@/components/forms/AccountProfile'

export default async function OnBoarding() {
  const user = await currentUser()
  const userInfo = { _id: '1', username: null, name: null, bio: 'example bio', image: null }

  const userData = {
    id: user?.id,
    objectId: userInfo._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl,
  }

  return (
    <main className="mx-auto flex flex-col max-w-3xl justify-start py-20 px-10">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  )
}
