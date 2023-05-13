import Chat from '@/components/Chat'
 import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/components/Providers'
const inter = Inter({ subsets: ['latin'] })
// import Provider from '@/components/Providers'

export const metadata = {
  title: 'بوت الدردشة  بالاعتماد على الذكاء الاصطناعي',
  description: 'تواصلو معنا للحصول على نسخة مخصصة لبياناتكم',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
    <Provider>
      <body className={inter.className}>
        <Chat />
        {children}
      </body>
      </Provider>
  </html>
  )
}
