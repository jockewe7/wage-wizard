import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/content'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const guides = getAllPosts('guides')
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const guide = getPostBySlug(slug, 'guides')

  if (!guide) {
    return {
      title: 'Guide hittades inte',
    }
  }

  return {
    title: guide.frontmatter.seoTitle || guide.frontmatter.title,
    description: guide.frontmatter.seoDescription || guide.frontmatter.description,
    keywords: guide.frontmatter.tags.join(', '),
    openGraph: {
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      type: 'article',
      publishedTime: guide.frontmatter.publishedAt,
      modifiedTime: guide.frontmatter.updatedAt,
      tags: guide.frontmatter.tags,
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getPostBySlug(slug, 'guides')

  if (!guide) {
    notFound()
  }

  const relatedGuides = getRelatedPosts(slug, guide.frontmatter.category, 'guides', 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Link */}
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Tillbaka till guider
        </Link>

        {/* Guide Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-accent/10 text-accent-foreground rounded-full">
                <BookOpen className="h-3 w-3" />
                {guide.frontmatter.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDistanceToNow(new Date(guide.frontmatter.publishedAt), { 
                    addSuffix: true, 
                    locale: sv 
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {guide.readingTime.text}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {guide.frontmatter.title}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {guide.frontmatter.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {guide.frontmatter.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Guide Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border">
            <MDXRemote 
              source={guide.content} 
              options={mdxOptions}
            />
          </div>
        </article>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Relaterade guider
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGuides.map((relatedGuide) => (
                <Link key={relatedGuide.slug} href={`/guides/${relatedGuide.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-shadow h-full">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent-foreground rounded-full mb-2">
                      {relatedGuide.frontmatter.category}
                    </span>
                    
                    <h3 className="font-semibold text-foreground mb-2 hover:text-accent-foreground transition-colors line-clamp-2">
                      {relatedGuide.frontmatter.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {relatedGuide.frontmatter.description}
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