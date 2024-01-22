import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="head-text">Home</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
