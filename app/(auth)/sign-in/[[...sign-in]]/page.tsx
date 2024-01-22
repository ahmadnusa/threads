import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: 'bg-slate-700 hover:bg-slate-600 text-sm normal-case',
          footerActionLink: 'text-slate-300 hover:text-slate-200',
        },
      }}
    />
  )
}
