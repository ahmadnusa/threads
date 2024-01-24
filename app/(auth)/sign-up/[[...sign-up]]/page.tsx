import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className="flex justify-center items-center min-h-screen w-full bg-slate-800">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'bg-slate-800 hover:bg-slate-700 text-sm normal-case',
            footerActionLink: 'text-slate-300 hover:text-slate-200',
          },
        }}
      />
    </main>
  )
}
