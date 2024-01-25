import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '../ui/button'

export default function Header() {
  return (
    <header className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <nav className="flex items-center gap-1 ">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src={'/assets/logout.svg'} alt="logout" width={24} height={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <SignedOut>
          <SignInButton>
            <Button className="bg-primary-500 text-light-1 hover:bg-primary-500/80">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: 'py-2 px-4',
            },
          }}
        />
      </nav>
    </header>
  )
}
