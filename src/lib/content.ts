import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'src/content')

export interface PostFrontmatter {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  slug: string
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export function getAllPosts(type: 'blog' | 'guides' = 'blog'): Post[] {
  const postsDirectory = path.join(contentDirectory, type)
  
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const slug = filename.replace(/\.mdx$/, '')
      const readTime = readingTime(content)

      return {
        slug,
        frontmatter: {
          ...data,
          slug,
        } as PostFrontmatter,
        content,
        readingTime: readTime,
      }
    })
    .sort((a, b) => 
      new Date(b.frontmatter.publishedAt).getTime() - 
      new Date(a.frontmatter.publishedAt).getTime()
    )

  return posts
}

export function getPostBySlug(slug: string, type: 'blog' | 'guides' = 'blog'): Post | null {
  try {
    const filePath = path.join(contentDirectory, type, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const readTime = readingTime(content)

    return {
      slug,
      frontmatter: {
        ...data,
        slug,
      } as PostFrontmatter,
      content,
      readingTime: readTime,
    }
  } catch (error) {
    return null
  }
}

export function getPostsByCategory(category: string, type: 'blog' | 'guides' = 'blog'): Post[] {
  const posts = getAllPosts(type)
  return posts.filter(post => post.frontmatter.category === category)
}

export function getPostsByTag(tag: string, type: 'blog' | 'guides' = 'blog'): Post[] {
  const posts = getAllPosts(type)
  return posts.filter(post => post.frontmatter.tags.includes(tag))
}

export function getAllCategories(type: 'blog' | 'guides' = 'blog'): string[] {
  const posts = getAllPosts(type)
  const categories = posts.map(post => post.frontmatter.category)
  return [...new Set(categories)]
}

export function getAllTags(type: 'blog' | 'guides' = 'blog'): string[] {
  const posts = getAllPosts(type)
  const tags = posts.flatMap(post => post.frontmatter.tags)
  return [...new Set(tags)]
}

export function getRelatedPosts(currentSlug: string, category: string, type: 'blog' | 'guides' = 'blog', limit: number = 3): Post[] {
  const posts = getAllPosts(type)
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug && post.frontmatter.category === category)
    .slice(0, limit)
  
  return relatedPosts
}