import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Authentication',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-slate-900">
      {children}
    </div>
  )
}
