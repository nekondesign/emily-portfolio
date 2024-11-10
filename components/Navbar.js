import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Emily
          </Link>

          <div className="space-x-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/portfolio" className="hover:text-primary">
              Portfolio
            </Link>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}