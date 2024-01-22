import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 'bg-slate-800 hover:bg-slate-700 text-sm normal-case',
          footerActionLink: 'text-slate-300 hover:text-slate-200',
        },
      }}
    />
  )
}
