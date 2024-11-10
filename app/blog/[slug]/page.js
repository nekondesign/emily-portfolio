import { getBlogPostBySlug, getBlogSlugs } from '@/lib/blog'
import Image from 'next/image'

export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }))
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  const MDXContent = post.content

  return (
    <article className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー部分 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.frontmatter.tags && (
              <div className="flex gap-2">
                {post.frontmatter.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* メイン画像 */}
        {post.frontmatter.image && (
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* MDXコンテンツ */}
        <div className="prose prose-lg max-w-none">
          <MDXContent />
        </div>
      </div>
    </article>
  )
}