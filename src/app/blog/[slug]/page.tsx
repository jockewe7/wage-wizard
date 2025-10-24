import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/content'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts('blog')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'blog')

  if (!post) {
    return {
      title: 'Artikel hittades inte',
    }
  }

  return {
    title: post.frontmatter.seoTitle || post.frontmatter.title,
    description: post.frontmatter.seoDescription || post.frontmatter.description,
    keywords: post.frontmatter.tags.join(', '),
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.updatedAt,
      tags: post.frontmatter.tags,
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'blog')

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, post.frontmatter.category, 'blog', 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Tillbaka till artiklar
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                {post.frontmatter.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDistanceToNow(new Date(post.frontmatter.publishedAt), { 
                    addSuffix: true, 
                    locale: sv 
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime.text}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {post.frontmatter.title}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {post.frontmatter.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {post.frontmatter.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border">
            <MDXRemote 
              source={post.content} 
              options={mdxOptions}
            />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Relaterade artiklar
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-shadow h-full">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2">
                      {relatedPost.frontmatter.category}
                    </span>
                    
                    <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.frontmatter.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {relatedPost.frontmatter.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}