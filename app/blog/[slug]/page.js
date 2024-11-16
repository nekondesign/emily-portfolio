import { getBlogPostBySlug, getBlogSlugs } from '@/lib/blog'
import Image from 'next/image'

// 静的なページ生成のためのパラメータ
export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }))
}

// メタデータの生成
export async function generateMetadata({ params }) {
  // paramsを非同期的に解決してからslugを取得
  const resolvedParams = await params
  const post = await getBlogPostBySlug(resolvedParams.slug)
  
  // 記事の公開日をフォーマット
  const publishDate = new Date(post.frontmatter.date).toISOString()
  
  return {
    // 基本的なメタデータ
    title: post.frontmatter.title,
    description: post.frontmatter.description || `${post.frontmatter.title}に関する記事です。`,
    
    // OGP設定
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: publishDate,
      authors: [post.frontmatter.author || 'Emily'],
      images: [
        {
          url: post.frontmatter.image,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        }
      ],
      tags: post.frontmatter.tags || [],
    },
    
    // Twitterカード設定
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [post.frontmatter.image],
    },
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  const MDXContent = post.content
  
  // 構造化データ（JSON-LD）の作成
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    datePublished: new Date(post.frontmatter.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || 'Emily',
    },
    keywords: post.frontmatter.tags?.join(', '),
    articleBody: post.frontmatter.description,
    publisher: {
      '@type': 'Organization',
      name: "Emily's Portfolio",
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.example.com/logo.png' // あなたのロゴURLに変更してください
      }
    }
  }

  return (
    <>
      {/* 構造化データの挿入 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      
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
    </>
  )
}