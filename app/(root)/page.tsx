import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="head-text">Home</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
