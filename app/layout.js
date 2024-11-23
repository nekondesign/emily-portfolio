import GoogleAnalytics from './third-parties/google-analytics'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  // 基本設定
  title: {
    default: "Emily's Portfolio",
    template: '%s | Emily\'s Portfolio'
  },
  description: 'Creative Web Designer based in Tokyo',
  
  // メタデータのベースURL設定
  metadataBase: new URL('https://lovely-frangollo-bd1012.netlify.app'),
  
  // 基本的なメタタグ
  keywords: ['Web Design', 'Portfolio', 'Tokyo', 'Creative Design'],
  authors: [{ name: 'Emily', url: 'https://lovely-frangollo-bd1012.netlify.app' }],
  creator: 'Emily',
  
  // SNSカード設定（OGP）
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lovely-frangollo-bd1012.netlify.app',
    siteName: "Emily's Portfolio",
    title: "Emily's Portfolio",
    description: 'Creative Web Designer based in Tokyo',
    images: [
      {
        url: 'https://lovely-frangollo-bd1012.netlify.app/images/seo/ogp.jpg',
        width: 1200,
        height: 630,
        alt: "Emily's Portfolio",
      }
    ],
  },
  
  // Twitterカード設定
  twitter: {
    card: 'summary_large_image',
    title: "Emily's Portfolio",
    description: 'Creative Web Designer based in Tokyo',
    creator: '@emilytwitter',
    images: ['https://lovely-frangollo-bd1012.netlify.app/images/seo/ogp.jpg'],
  },
  
  // アイコン設定
  icons: {
    icon: 'https://lovely-frangollo-bd1012.netlify.app/icon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
  },
  
  // robots設定
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
          <GoogleAnalytics />
        </main>
        <Footer />
      </body>
    </html>
  )
}