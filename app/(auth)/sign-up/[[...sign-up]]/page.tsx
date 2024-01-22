import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: 'bg-dark-1 hover:bg-dark-4 text-sm normal-case',
          footerActionLink: 'text-dark-4',
        },
      }}
    />
  )
}
