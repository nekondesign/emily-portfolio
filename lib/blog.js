import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content', 'blog')

export function getBlogSlugs() {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }
  const files = fs.readdirSync(contentDirectory)
  return files.filter(file => /\.mdx?$/.test(file))
}

export async function getBlogPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx$/, '')
  
  // MDXファイルを動的にインポート
  const { default: MDXContent, frontmatter } = await import(`@/content/blog/${realSlug}.mdx`)
  
  // 日付がstring型であることを確認
  const formattedDate = frontmatter?.date ? new Date(frontmatter.date).toISOString() : null

  return {
    slug: realSlug,
    frontmatter: {
      ...frontmatter,
      date: formattedDate,
      // デフォルト値を設定
      title: frontmatter?.title || 'Untitled',
      excerpt: frontmatter?.excerpt || '',
      tags: frontmatter?.tags || [],
      image: frontmatter?.image || '/images/default-blog.jpg'
    },
    content: MDXContent
  }
}

export async function getAllBlogPosts() {
  const slugs = getBlogSlugs()
  const posts = await Promise.all(
    slugs.map(slug => getBlogPostBySlug(slug))
  )
  
  // 日付でソート（新しい記事が先頭に来るように）
  return posts.sort((a, b) => {
    if (!a.frontmatter.date) return 1
    if (!b.frontmatter.date) return -1
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
}