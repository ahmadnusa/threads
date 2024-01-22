import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Home() {
  return (
    <div className="h-screen flex justify-center text-center">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
