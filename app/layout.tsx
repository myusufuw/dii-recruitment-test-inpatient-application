'use client'

import Sidebar from '@/components/sidebar'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const queryClient = new QueryClient()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-row h-screen overflow-hidden`}
      >
        <QueryClientProvider client={queryClient}>
          <Sidebar />
          <div className='w-full h-screen flex flex-col p-6 overflow-auto bg-zinc-50'>
            {children}
            <Toaster richColors position='top-center' />
          </div>
        </QueryClientProvider>
      </body>
    </html>
  )
}
